
import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { MessageSquare, Users } from "lucide-react";
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
import { SearchInput } from "@/components/search-input";

import { Categories } from "@/components/categories";
import prisma from "@/lib/prisma";
import { Experts } from "@/components/experts";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextRequest } from "next/server";

import { cookies } from 'next/headers'
import  jwt  from "jsonwebtoken";
import { getUserToken } from "@/app/helpers/getUserToken";
import { getDomainName } from "@/app/helpers/getDomainName";

interface GPTCHAT {
    role: "user" | "system"; 
    content: string;
  }
  
interface ExpertsPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const ExpertsPage =async ({
    searchParams
}: ExpertsPageProps) => {

    const userToken = getUserToken();
    const domainName = getDomainName();
    

    const data = await prisma.companion.findMany({
        where:  {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    const categories = await prisma.category.findMany(); 

  

    // const [categories, setCategories] = useState<Category[]>([]);
    // const [isLoading, setIsLoading] = useState(true); // Add a loading state
  
    // useEffect(() => {
    //   async function fetchData() {
    //     try {
    //       const categoriesData = await categoriesList();
    //       setCategories(categoriesData);
    //       setIsLoading(false); // Set isLoading to false when data is fetched
    //     } catch (error) {
    //       console.error("Error fetching categories:", error);
    //     }
    //   }
    //   fetchData();
    // }, []);

    // const proModal = useProModal();

    // const router = useRouter();
    // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         prompt: ""
    //     }
    // });

    // const isLoading = form.formState.isSubmitting;

    // const onSubmit = async (values : z.infer<typeof formSchema>) => {
        
    //     try {
       
    //         const userMessage: ChatCompletionRequestMessage = {
    //             role: "user",
    //             content: values.prompt,
    //         };

    //         const newMessages = [...messages, userMessage];

    //         const responce = await axios.post("/api/conversation", {
    //             messages: newMessages,
    //         });

    //         setMessages((current) => [...current, userMessage, responce.data]);

    //         form.reset();
    //     }
    //     catch (error: any) {
    //         console.log(error);
    //         if(error?.response?.status === 403) {
    //             proModal.onOpen();
    //         } else {
    //             toast.error("Something went wrong");
    //         }

            
    //     }
    //     finally {
    //         router.refresh();
    //     }

    // }

    return ( 
        <div>
            <Heading 
            title="Experts"
            description="Our industry leading ai experts."
            icon={Users}
            iconColor="text-violet-500"
            bgColor="text-violet-500/10"
            />

            <div className="h-full p-4 space-y-2">
                <SearchInput />
                <Categories data={categories} />
                <Experts data={data} />
            </div>

        </div>

        
     );
}
 
export default ExpertsPage;

