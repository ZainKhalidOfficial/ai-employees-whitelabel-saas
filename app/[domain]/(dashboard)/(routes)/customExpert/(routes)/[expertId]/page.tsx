import prisma from "@/lib/prisma";
import { ExpertForm } from "./components/expert-form";


import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";

interface ExpertIdProps {
    params : {
        expertId: string
    };
};

const ExpertId = async ({
    params
}: ExpertIdProps) => {

    // const { userId } = auth();
    // //TODO: Check Subscription

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
            id: params.expertId,
            userId : decodedToken.id //userId
        }
    });

    const categories = await prisma.category.findMany();

    return ( 
        <ExpertForm
        initialData={expert}
        categories={categories}
        />
     );
}
 
export default ExpertId;