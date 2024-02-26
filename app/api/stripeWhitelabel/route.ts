
import prisma from "@/lib/prisma";
// import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import Stripe from "stripe";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
import { getUserToken } from "@/app/helpers/getUserToken";

// const settingsUrl = absoluteUrl("/settings");
const settingsUrl =  `http://app.localhost:3000/plan`

export async function POST(
    req: Request
) {

    try {

        const body = await req.json();
        const { planSelected } = body;
        console.log("I'm inside the stripeWhitelabel Api.")

        const session = await getUserToken();

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        const stripe = new Stripe(process.env.WHITELABEL_STRIPE_API_KEY!, { 
            apiVersion: "2023-08-16",
            typescript: true,
        })
        

        const TenantSubscription = await prisma.tenantSubscription.findUnique({
            where: {
                userId:session.user.id
            }
        });

        console.log("settingsUrl : ",settingsUrl)
        console.log("Zain User Email is : ",session.user.email )

        if(TenantSubscription && TenantSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: TenantSubscription.stripeCustomerId,
                return_url: settingsUrl, 
            });

            console.log("Zain StripeSessionURL 1 = ",stripeSession.url)
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));

        }
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: session.user.email, //user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: planSelected.name,
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: planSelected.price * 100,  //price * 100 = price in USD 
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: session.user.id,
                label:planSelected.name,
                price: planSelected.price,
                sitesAllowed: planSelected.sitesAllowed,
                customDomain: planSelected.customDomain,
                customExperts: planSelected.customExperts,
            },
        });
 

        // const stripeSession = await stripe.checkout.sessions.create({
        //     success_url: settingsUrl,
        //     cancel_url: settingsUrl,
        //     payment_method_types: ["card"],
        //     mode: "subscription",
        //     billing_address_collection: "auto",
        //     customer_email: decodedToken.email, //user.emailAddresses[0].emailAddress,
        //     line_items: [
        //         {
        //             price_data: {
        //                 currency: "USD",
        //                 product_data: {
        //                     name: "Subscription Pro",
        //                     description: "Unlimited AI Generations",
        //                 },
        //                 unit_amount: 2000,  //20$
        //                 recurring: {
        //                     interval: 'month'
        //                 }
        //             },
        //             quantity: 1,
        //         }
        //     ],
        //     metadata: {
        //         userId: decodedToken.id,
        //         tokens: 2000,
        //         businessProfiles: 5,
        //         customExperts: 5,
        //     },
        // });

        console.log("Zain StripeSessionURL 2 = ",stripeSession.url)
          
        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {
        console.log("[STRIPE_ERROR] /api/stripe/route", error);

        return new NextResponse("Internal Error", { status: 500});
    }
}