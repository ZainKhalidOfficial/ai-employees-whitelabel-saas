import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { increaseApiLimit, getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { MAX_FREE_COUNT } from "@/constants";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(
    req: NextRequest
) {
    try {

        // const { userId } = auth();
        const body = await req.json();
        const { prompt, amount=1, resolution="512x512" } = body;

        // if(!userId) {
        //     return new NextResponse("Unaauthorized", { status: 401 });
        // }

        const session = await getDataFromToken(req);

        if(!session)
        {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }

        if(!amount) {
            return new NextResponse("Amount are required", { status: 400 });
        }

        if(!resolution) {
            return new NextResponse("Resolution are required", { status: 400 });
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

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        });

        //TODO: Modify this increase Api limit function to be dynamic in reducing tokens
            await increaseApiLimit('tokens');

        return NextResponse.json(response.data);



    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500});
    }

}