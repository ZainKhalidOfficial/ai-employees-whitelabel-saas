import { NextRequest, NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { MAX_FREE_COUNT } from "@/constants";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

const instructionMessage = {
    role : "system",
    content : "You are a helpful code assistant. You must answer code in markdown code snippets only. Use comments for short code explanation."
}

export async function POST(
    req: NextRequest
) {
    try {

        // const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        const session = await getDataFromToken(req);

        if(!session)
        {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        // if(!configuration.apiKey) {
        //     return new NextResponse("OpenAI API Key not configured", { status: 500 });
        // }

        if(!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        
        const used = await getApiLimitCount();
        const isPro = await checkSubscription();

        // if(!freeTrial && !isPro.isPro) {
        if(isPro.isPro && (used.tokensUsed >= isPro.tokensAllowed)) {
            return new NextResponse("Limit reached! Please resubscribe for more.", { status: 403 });
        } 
        else if (used.tokensUsed >= MAX_FREE_COUNT)
        {
            return new NextResponse("Free trial has ended! Please subscribe for more.", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages : [instructionMessage, ...messages]
        });

        //TODO: Modify this increase Api limit function to be dynamic in reducing tokens
        await increaseApiLimit('tokens');

        return NextResponse.json(response.choices[0].message);



    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500});
    }

}