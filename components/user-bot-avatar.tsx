// "use client";

import { getUserToken } from "@/app/helpers/getUserToken";
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export const ExpertUserAvatar = async () => {
    // const { user } = useUser();
    const session = await getUserToken()

    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={session?.user.image} />
        </Avatar>
    )
}