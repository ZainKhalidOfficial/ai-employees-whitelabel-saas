import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface ExpertBotAvatarProps {
    src: string
};

export const ExpertBotAvatar = ({
    src
}: ExpertBotAvatarProps) => {
    return (
        <Avatar className="w-12 h-12">
            <AvatarImage src={src} />
        </Avatar>
    )
}