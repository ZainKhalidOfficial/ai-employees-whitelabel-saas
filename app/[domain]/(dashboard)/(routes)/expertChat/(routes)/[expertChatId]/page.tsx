import prisma from "@/lib/prisma";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { ExpertChatClient } from "./components/client";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";

interface ExpertChatIdProps {
    params: {
        expertChatId: string;
    }
}

const ExpertChatId = async ({
    params
}: ExpertChatIdProps) => {

    // const { userId } = auth();

    // if(!userId) {
    //     return redirectToSignIn();
    // }

    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception at expertChat page.tsx : ",error)
        // router.push("/login");
    }

    const expert = await prisma.companion.findUnique({
        where: {
            id: params.expertChatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId : decodedToken.id,
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
            userId: decodedToken.id
        },
    });

    if(!expert) {
        return redirect("/dashboard")
    }
    return ( 
        <ExpertChatClient expert={expert} businessProfiles={businessProfiles} user={decodedToken} />
     );
}
 
export default ExpertChatId;