import prisma from "@/lib/prisma";
import { BusinessProfilesForm } from "./components/business-profiles-form";

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