import { NextRequest, NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

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

        // if(!configuration.apiKey) {
        //     return new NextResponse("OpenAI API Key not configured", { status: 500 });
        // }

        if(!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }

        if(!amount) {
            return new NextResponse("Amount are required", { status: 400 });
        }

        if(!resolution) {
            return new NextResponse("Resolution are required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if(!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 });
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        });

        //TODO: Modify this increase Api limit function to be dynamic in reducing tokens
        if(!isPro)
        {
            await increaseApiLimit('tokens');
        }


        return NextResponse.json(response.data);



    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500});
    }

}