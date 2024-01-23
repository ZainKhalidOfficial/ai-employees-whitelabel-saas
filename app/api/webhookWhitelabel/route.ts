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

    const stripe = new Stripe(process.env.WHITELABEL_STRIPE_API_KEY!, {
        apiVersion: "2023-08-16",
        typescript: true,
    })

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.WHITELABEL_STRIPE_WEBHOOK_SECRET!
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

    await prisma.tenantSubscription.create({
        data: {
            userId: session?.metadata?.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
            ),
            tier: session?.metadata?.label,
            pricePaid: Number(session?.metadata?.price),
            sitesAllowed: Number(session?.metadata?.sitesAllowed),
            customDomain:session?.metadata?.customExperts,
        },
    });

    }

    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await prisma.tenantSubscription.update({
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

