// import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {

    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception: ",error);
        return  {isPro:false,
                 tokensAllowed: 0,
                 businessProfilesAllowed:0,
                 customEmployeesAllowed:0};
        // router.push("/login");
    }


    if(!decodedToken.id) {
            return {isPro:false,
                    tokensAllowed: 0,
                    businessProfilesAllowed:0,
                    customEmployeesAllowed:0};
         }

    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            userId: decodedToken?.id
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            tokensAllowed: true,
            businessProfilesAllowed:true,
            customEmployeesAllowed:true
            
        },
    });

    if(!userSubscription) {
        return {isPro:false,
                tokensAllowed: 0,
                businessProfilesAllowed:0,
                customEmployeesAllowed:0};
    }

    const isValid = 
                    userSubscription.stripePriceId &&
                    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return {isPro:!!isValid,
            tokensAllowed:Number(userSubscription.tokensAllowed),
            businessProfilesAllowed:Number(userSubscription.businessProfilesAllowed),
            customEmployeesAllowed:Number(userSubscription.customEmployeesAllowed) };  // !! ensures that this is always a boolean
}