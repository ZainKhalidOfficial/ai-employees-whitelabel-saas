"use client"

import axios from "axios";
import * as z from "zod";

import { useCompletion} from "ai/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ExpertChatHeader } from "@/components/expert-chat-header";
import { BusinessProfile, Companion, Message, User } from "@prisma/client"
import exp from "constants";
import { ExpertChatForm } from "@/components/expert-chat-form";
import { ExpertChatMessages } from "@/components/expert-chat-messages";
import { ExpertChatMessageProps } from "@/components/expert-chat-message";



import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import  ChatCompletionRequestMessage  from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import { error } from "console";
import { ExpertBotAvatar } from "@/components/expert-bot-avatar";
import { BeatLoader } from "react-spinners";
import { useTheme } from "next-themes";
import { ExpertChatParameters } from "@/components/expert-chat-select-business";

interface GPTCHAT {
    role: "user" | "system"; 
    content: string;
  }
  

interface ExpertChatClientProps {

    expert: Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };

    businessProfiles : BusinessProfile[];

    user: User;
};

export const ExpertChatClient = ({

    expert,
    businessProfiles,
    user,
}: ExpertChatClientProps) => {


    const { theme } = useTheme();

    const router = useRouter();
    const searchParams = useSearchParams()
    
 
    const [messages, setMessages] = useState<GPTCHAT[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });
    

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        
        try {

            const userMessage: GPTCHAT = {
                role: "user",
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];


            const responce = await axios.post(`/api/expertChat/${expert.id}`, {
                messages: newMessages,
                businessId: searchParams?.get('businessId'),
                modelName: searchParams?.get('modelName')
            });

            setMessages((current) => [...current, userMessage, responce.data]);

            form.reset();
        }
        catch (error: any) {
            console.log("Zain Error : ",error);
            if(error?.response?.status === 403) {
                toast.error("Not Subscribed!");
        
            } else {
                toast.error("Something went wrong");
            }

            
        }
        finally {
            router.refresh();
        }

    }

    // const router = useRouter(); 
    // const [messages, setMessages] = useState<ExpertChatMessageProps[]>(expert.messages)

    // const {
    //     input,
    //     isLoading,
    //     handleInputChange,
    //     handleSubmit,
    //     setInput,
    // } = useCompletion({
    //     api: `/api/expertChat/${expert.id}`,
    //     onFinish(prompt, completion) {
    //         const systemMessage: ExpertChatMessageProps = {
    //             role: 'system',
    //             content: completion,
    //         };

    //         setMessages((current) => [...current, systemMessage]);
    //         setInput("");

    //         router.refresh();
    //     },
    // });

    // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     const userMessage: ExpertChatMessageProps = {
    //         role: 'user',
    //         content: input,
    //     };

    //     setMessages((current) => [...current, userMessage]);

    //     handleSubmit(e);
    // }

    return (
        <div className="flex flex-col px-4 space-y-2 h-full">
            <ExpertChatHeader expert={expert} user={user} />

            <ExpertChatParameters businessProfiles={businessProfiles} user={user} />

                <div>
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        "
                        >
                        <FormField 
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input
                                        className="border-0 pl-10 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="Ask me something!"
                                        {...field}
                                    />

                                </FormControl>

                            </FormItem>
                        )}
                        />
                          <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                            Send
                            </Button>  

                        </form>

                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-8 rounded-lg gap-x-8 w-full items-center flex
                             bg-muted">
                                <ExpertBotAvatar src={expert.src} />

                                <BeatLoader 
                                   size={5}
                                   color={theme === "light" ? "black" : "white"}
                                 />
                            </div>
                        )
                    }
                    
                    {
                        messages.length === 0 && !isLoading && (
                                <Empty label="No Conversation Started" />
                        )
                    }
                    <div className="flex flex-col-reverse gap-y-4" >

                        {messages.map((message) => (
                            <div 
                            key={message.content}
                            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                            message.role === "user" ? "bg-muted/40 border border-black/10"
                            : "bg-muted"
                            )}
                            >
                                {message.role === "user" ? <ExpertBotAvatar src={user.image} />:<ExpertBotAvatar src={expert.src} />} {/*<UserAvatar user={user} /> */}
                                <p className="text-sm">
                                {message.content}
                                </p>
                                 </div>
                        ))}

                    </div>
                </div>
           

         
        </div>
    )
}