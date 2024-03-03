import prisma from "@/lib/prisma";
import { ExpertChatClient } from "./components/client";
import { redirect } from "next/navigation";
import { getUserToken } from "@/app/helpers/getUserToken";

interface ExpertChatIdProps {
    params: {
        expertChatId: string;
    }
}

const ExpertChatId = async ({
    params
}: ExpertChatIdProps) => {


    const userData = getUserToken();

    const expert = await prisma.companion.findUnique({
        where: {
            id: params.expertChatId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId : userData?.user.id,
                    // userId: 'admin'
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    let businessProfiles = await prisma.businessProfile.findMany({
        where: {
            userId: userData?.user.id,
        },
    });

    businessProfiles.unshift({id:'none1',userId:'none2', userName: 'none3', name:'None',
    profileData:'', createdAt:(new Date(Date.now())),
    updatedAt: (new Date(Date.now()))});

    if(!expert) {
        return redirect("/experts")
    }
    return ( 
        <ExpertChatClient expert={expert} businessProfiles={businessProfiles} user={userData?.user} />
     );
}
 
export default ExpertChatId;