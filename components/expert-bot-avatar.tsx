import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface ExpertBotAvatarProps {
    src: string | null
};

export const ExpertBotAvatar = ({
    src
}: ExpertBotAvatarProps) => {
    return (
        <Avatar className="w-12 h-12">
            {src?
            <AvatarImage src={src} />
            : <AvatarImage src={""} />}
        </Avatar>
    )
}