"use client"

import axios from "axios";
import { Companion, Message, User } from "@prisma/client"
import { Button } from "./ui/button";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ExpertBotAvatar } from "@/components/expert-bot-avatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";


interface ExpertChatHeaderProps {
    expert : Companion & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };

    user : User;
};

export const ExpertChatHeader =  ({
    expert,
    user
}: ExpertChatHeaderProps) => {
    const router = useRouter();
    // const { user } = useUser();




    // const { toast } = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/expert/${expert.id}`);

            // toast({
            //     description: "Success."
            // });
            console.log("Success")

            router.refresh();
            router.push("/expertsPage")
        } catch (error) {
            // toast({
            //     description: "Something went wrong.",
            //     variant: "destructive"
            // })
            console.log("Something went wrong")
        }
    }

    return (
        <div className="flex w-full justify-between items-center border-b border-primary/50 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <ExpertBotAvatar src={expert.src} />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold">
                        {expert.name}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MessagesSquare className="w-3 h-3 mr-1" />
                        {expert._count.messages}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {expert.description}
                    </p>
                </div>
            </div>
            {user?.id === expert.userId && ( 
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/expert/${expert.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}