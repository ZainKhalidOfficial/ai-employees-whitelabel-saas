"use client"

import axios from "axios";
import { BusinessProfile, Companion, Message, User } from "@prisma/client"
import { Button } from "./ui/button";
import { ArrowDown, Building, Building2, ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ExpertBotAvatar } from "@/components/expert-bot-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
// import prismadb from "@/lib/prismadb";
import qs from "query-string";

const models = [
    {name : "gpt-3.5-turbo"},
    {name : "gpt-4"},
]

interface ExpertChatParametersProps {
    businessProfiles : BusinessProfile[],
    user: User;
};

export const ExpertChatParameters = ({
    businessProfiles
}: ExpertChatParametersProps) => {
    const router = useRouter();
    // const { user } = useUser();
    // const { toast } = useToast();
    const searchParams = useSearchParams();


    const businessId = searchParams.get("businessId");
    const modelName = searchParams.get("modelName");

    const onClick = (id: string) => {
        
        const query = { businessId: id};

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true});

        router.push(url);
    }

    const onClickModel = (name: string) => {
        
        const query = { modelName: name};

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true});

        router.push(url);
    }




    return (
          <div className="flex justify-center space-x-2">
           
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Building2 className="m-2" /> Select Business Profile
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                      
                       {
                       businessProfiles.map((profile) => (
                        <DropdownMenuItem key={profile.name} onClick={() => onClick(profile.id)} >
                            <Building className="w-4 h-4 mr-2" />
                            {profile.name}
                        </DropdownMenuItem> 
                        )) 
                        }
                        
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Building2 className="m-2" /> Select Language Model
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                      
                       {
                       models.map((model) => (
                        <DropdownMenuItem key={model.name} onClick={() => onClickModel(model.name)} >
                            <Building className="w-4 h-4 mr-2" />
                            {model.name}
                        </DropdownMenuItem> 
                        )) 
                        }
                        
                    </DropdownMenuContent>
                </DropdownMenu>
           

          </div>
    )
}