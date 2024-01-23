import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function GET() {

    try{

        const apiLimitCount = await getApiLimitCount();
        const isPro = await checkSubscription();
        
        return NextResponse.json({'tokensUsed':apiLimitCount.tokensUsed, 
                                  'businessProfilesUsed':apiLimitCount.businessProfilesUsed ,
                                  'customEmployeesUsed':apiLimitCount.customEmployeesUsed, 
                                  'isPro':isPro.isPro, 
                                  'tokensAllowed': isPro.tokensAllowed, 
                                  'businessProfilesAllowed':isPro.businessProfilesAllowed,
                                  'customEmployeesAllowed':isPro.customEmployeesAllowed });
    }
     catch (error) {
        
    console.log("[Subscription_Status_API_Error]", error);

    return new NextResponse("Internal Error", { status: 500});
}

}