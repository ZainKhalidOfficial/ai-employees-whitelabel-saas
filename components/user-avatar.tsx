"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client"

interface UserAvatarProps {
    user: User | null;
};



export const UserAvatar = ({
    user
}: UserAvatarProps) => {
    // const { user } = useUser();

    // replaced user?.profileImageUrl   in AvatarImage Tag
    return (
        <div>

            <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || undefined} /> 
                <AvatarFallback>
                    {user?.username ? user?.username.charAt(0) : null}
                    
                </AvatarFallback>
            </Avatar>

        </div>
    )
}