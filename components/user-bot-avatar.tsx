"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const ExpertUserAvatar = () => {
    const { user } = useUser();

    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={user?.imageUrl} />
        </Avatar>
    )
}