import prisma from "@/lib/prisma";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { ExpertChatClient } from "./components/client";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
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

    const businessProfiles = await prisma.businessProfile.findMany({
        where: {
            userId: userData?.user.id,
        },
    });

    if(!expert) {
        return redirect("/dashboard")
    }
    return ( 
        <ExpertChatClient expert={expert} businessProfiles={businessProfiles} user={userData?.user} />
     );
}
 
export default ExpertChatId;