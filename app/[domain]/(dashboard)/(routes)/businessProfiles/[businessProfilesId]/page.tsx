import prisma from "@/lib/prisma";
import { BusinessProfilesForm } from "./components/business-profiles-form";
// import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { cookies } from 'next/headers'
import  jwt  from "jsonwebtoken";

interface businessProfilesIdProps {
    params : {
        businessProfilesId: string
    };
};

const businessProfilesId = async ({
    params
}: businessProfilesIdProps) => {

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
        console.log("Custom Auth failed exception : ",error)
        // router.push("/login");
    }



    const businessProfiles = await prisma.businessProfile.findUnique({
        where: {
            id: params.businessProfilesId,
            userId : decodedToken.id
        }
    });


    return ( 

        <BusinessProfilesForm
        initialData={businessProfiles}
        />


     );
}
 
export default businessProfilesId;