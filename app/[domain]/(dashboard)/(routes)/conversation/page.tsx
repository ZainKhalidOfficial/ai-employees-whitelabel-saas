"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import  ChatCompletionRequestMessage  from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import { error } from "console";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";


interface GPTCHAT {
    role: "user" | "system"; 
    content: string;
  }

const ConversationPage = () => {

    const router = useRouter();

    let user : any = "iuser";

    useEffect(() => {
        let user = axios.get('api/authusers/me');
    },[]);

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

            const responce = await axios.post("/api/conversation", {
                messages: newMessages,
            });

 
            setMessages((current) => [...current, userMessage, responce.data]);

            form.reset();
        }
        catch (error: any) {
            console.log(error);
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

    return ( 
        <div>
            <Heading 
            title="Conversation"
            description="Our most advanced conversation model."
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="text-violet-500/10"
            />

            <div className="px-4 lg:px-8">
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
                            Generate
                            </Button>  

                        </form>

                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center
                            justify-center bg-muted"> 
                                <Loader />
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
                                {message.role === "user" ?  <UserAvatar user={user}/> : <BotAvatar />}  
                                <p className="text-sm">
                                {message.content}
                                </p>
                                 </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>

        
     );
}
 
export default ConversationPage;