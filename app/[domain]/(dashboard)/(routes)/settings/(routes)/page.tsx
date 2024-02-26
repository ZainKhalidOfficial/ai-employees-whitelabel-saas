import { Settings } from "lucide-react";

import { Heading } from "@/components/heading";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscription-button";
import { SubscriptionPlan } from "@/components/subscription-plan";
import { getSiteData } from "@/lib/fetchers";
import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";

const SettingsPage = async () => {

    const isPro = await checkSubscription();


    // const domainName = cookies().get('domainName')?. value || '';

    let domainName: any = "";

    try {
        const domaintoken = cookies().get('domainParams')?. value || '';

        domainName = jwt.verify(domaintoken , process.env.JWT_SECRET!)
    
    } catch (error) { 
        console.log("Custom Auth failed exception at expertChat page.tsx : ",error)

        return new NextResponse("Unauthorized", { status: 401 });
    }

    const [data] = await Promise.all([  //[data, posts] 
    getSiteData(domainName.hostname),
    // getPostsForSite(domain),
  ]);

  const planData = {
    silverPackagePrice: data?.silverPackagePrice,
    silverTokens:data?.silverTokens,
    silverBusinessProfiles:data?.silverBusinessProfiles,
    silverCustomEmployees:data?.silverCustomEmployees,
    
    goldPackagePrice:data?.goldPackagePrice,
    goldTokens:data?.goldTokens,
    goldBusinessProfiles:data?.goldBusinessProfiles,
    goldCustomEmployees:data?.goldCustomEmployees,

    platinumPackagePrice:data?.platinumPackagePrice,
    platinumTokens:data?.platinumTokens,
    platinumBusinessProfiles:data?.platinumBusinessProfiles,
    platinumCustomEmployees:data?.platinumCustomEmployees
    }

    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception : ",error)
        return new NextResponse("Unauthorized", { status: 401 });
        // router.push("/login");
    }

    if(!isPro.isPro)
    {
    return ( 
        <div>
            <Heading
            title="Settings"
            description="Manage Account Settings"
            icon={Settings}
            iconColor="text-gray-700"
            bgColor="bg-gray-700/10"
            />

            <div className="px-4 lg:px-8 space-y-4">
                <p className="text-muted-foreground text-sm">
                You are currently on a free plan.
                </p> 
               
                <p>User: {decodedToken.username}</p>
                <p>Email: {decodedToken.email}</p>
            </div>

        <div className="grid grid-cols-1 text-center ">
            <p className="font-bold text-3xl">Payment Plan</p>
        </div>

            <SubscriptionPlan isPro={{isPro:isPro.isPro , tokens:isPro.tokensAllowed}} disabled={false} planData={planData} />
            
        </div>
     );    

    } else {
        return ( 
            <div>
                <Heading
                title="Settings"
                description="Manage Account Settings"
                icon={Settings}
                iconColor="text-gray-700"
                bgColor="bg-gray-700/10"
                />

            <div className="px-4 lg:px-8 space-y-4">
               
                <p>User: {decodedToken.username}</p>
                <p>Email: {decodedToken.email}</p>
            </div>
    
                <div className="px-4 lg:px-8 space-y-4">
                    <div className="text-muted-foreground text-sm">
                    {isPro ? "You are currently on a pro plan." : "You are currently on a free plan."}
                    </div>
                    <SubscriptionButton isPro={{isPro:isPro.isPro , tokens:isPro.tokensAllowed}} />
                </div>
                
            </div>
         );    
    }
}
 
export default SettingsPage;    
