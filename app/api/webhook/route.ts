import Stripe from "stripe";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import  jwt  from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers";
// import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {

    console.log("Zain Webhook reached!");

    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    // let domainName: any = "";

    // try {
    //     const domaintoken = cookies().get('domainParams')?. value || '';

    //     domainName = jwt.verify(domaintoken , process.env.JWT_SECRET!)
    
    // } catch (error) { 
    //     console.log("Domainparams failed exception : ",error)

    //     return new NextResponse("Unauthorized", { status: 401 });
    // }

    const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    console.log("Zain Webhook Test : ", hostname)

//     const  = await Promise.all([  // 
//          getSiteData(hostname), //domainName.hostname
//         ]);

//    if (!data) {
//            notFound();
//           }

    const stripe = new Stripe(process.env.STRIPE_API_KEY!, { //process.env.STRIPE_API_KEY! //data.stripeApiKey!
        apiVersion: "2023-08-16",
        typescript: true,
    })

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!// data.stripeWebhookSecret!// process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`WebHook Error 1 : ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

    if(!session?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 });
    }

    await prisma.userSubscription.create({
        data: {
            userId: session?.metadata?.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            ),
            tokensAllowed:Number(session?.metadata?.tokens),
            businessProfilesAllowed:Number(session?.metadata?.businessProfiles),
            customEmployeesAllowed:Number(session?.metadata?.customExperts)
        },
    });

    }

    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await prisma.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            },
        });
    }

    return new NextResponse(`WebHook Error 2 `, { status: 200 });

}

