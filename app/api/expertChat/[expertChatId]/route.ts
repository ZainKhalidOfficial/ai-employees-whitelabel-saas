import { StreamingTextResponse, LangChainStream } from "ai";
// import { CallbackManager } from "langchain/callbacks";
// import { Replicate } from "langchain/llms/replicate";

// import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import prisma from "@/lib/prisma";
import { use } from "react";

import {NextRequest, NextResponse } from "next/server";

// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import { increaseApiLimit, checkApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { MAX_FREE_COUNT } from "@/constants";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(
    req: NextRequest,
    { params }: { params: { expertChatId: string } }
  ) {
    try {

        // const { userId } = auth();
        const body = await req.json();
        const { messages, businessId, modelName } = body;

        // let decodedToken: any = "";

        // try {
        //     const token = cookies().get('token')?. value || '';
    
        //     decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        //     // console.log("data : ", decodedToken.id);
        
        // } catch (error) { 
        //     console.log("Custom Auth failed exception at expertChat page.tsx : ",error)

        //     return new NextResponse("Unauthorized", { status: 401 });
        //     // router.push("/login");
        // }

        const session = await getDataFromToken(req);

        if(!session?.id)
        {
            return new NextResponse("Unauthorized", { status: 401 });
        }

    

        const identifier = req.url + "-" + session.id;
        const { success } =await rateLimit(identifier);

        if(!success) {
            return new NextResponse("Rate limit exceeded", { status: 429 });
        }


        if(!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }




        const used = await getApiLimitCount();
        const isPro = await checkSubscription();


        if(isPro.isPro && (used.tokensUsed >= isPro.tokensAllowed)) {
            return new NextResponse("Limit reached! Please resubscribe for more.", { status: 403 });
        } 
        else if (used.tokensUsed >= MAX_FREE_COUNT)
        {
            return new NextResponse("Free trial has ended! Please subscribe for more.", { status: 403 });
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
                        userId: session.id,
                    }
                },
                _count: {
                    select: {
                        messages: true
                    }
                }
            }
        });

        if(businessId)
        {
        const businessData = await prisma.businessProfile.findUnique({
            where: {
                id: businessId
            }
        });
        
        const businessDataMessage = {role: "user", content: `Remember my following business profile throught our chat : { Business Name : {{ ${businessData?.name} }}, Business Data: {{ ${businessData?.profileData} }}}`} 
        messages.unshift(businessDataMessage);
        }
        
        const seedChat = {role: "user", content: `Behave as in following example chat : { ${expert?.seed} }`}
        messages.unshift(seedChat);
        
        const instruction = {role: "system", content: expert?.instructions}
        messages.unshift(instruction);

        console.log("Messages : ",messages);

        let response;

        if(modelName){
            response = await openai.chat.completions.create({
                model: modelName,
                messages
            });
        }
        else
        {
            response = await openai.chat.completions.create({
            model: "gpt-4",
            messages
                    });
        }

        //TODO: Modify this increase Api limit function to be dynamic in reducing tokens

         await increaseApiLimit('tokens');
        

        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[EXPERT_CHAT_POST]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}