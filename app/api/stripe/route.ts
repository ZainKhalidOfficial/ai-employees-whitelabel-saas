import { auth, currentUser } from "@clerk/nextjs";

import prisma from "@/lib/prisma";
// import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import Stripe from "stripe";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import { notFound } from "next/navigation";

 const settingsUrl = 'http://zaintest.localhost:3000/settings'  //absoluteUrl("/settings"); 
// export async function GET() {
//     const url = req.nextUrl;


export async function POST(
    req: Request
) {
  
        // const { userId } = auth();

// // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   const hostname = req.headers
//   .get("host")!
//   .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

// const searchParams = req.nextUrl.searchParams.toString();
// // Get the pathname of the request (e.g. /, /about, /blog/first-post)
// const path = `${url.pathname}${
//   searchParams.length > 0 ? `?${searchParams}` : ""
// }`;


//  const tenantUrl = `${hostname}${path}`;


    try {

        const body = await req.json();
        const { planSelected } = body;


        let decodedToken: any = "";
        const token = cookies().get('token')?. value || '';
         decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
            // console.log("data : ", decodedToken.id);

        if( !decodedToken.id) {
            return new NextResponse("Unauthorized", { status: 401});
        }


        
        let domainName: any = "";


        try {
            const domaintoken = cookies().get('domainParams')?. value || '';
    
            domainName = jwt.verify(domaintoken , process.env.JWT_SECRET!)
        
        } catch (error) { 
            console.log("Custom Auth failed exception : ",error)
    
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // const settingsUrl = `http://${domainName.hostname}/settings`;
        // console.log("Zain settingsUrl = ", settingsUrl);

        const [data] = await Promise.all([  //[data, posts] 
             getSiteData(domainName.hostname),
            ]);

       if (!data) {
              notFound();
      }

        const stripe = new Stripe(data.stripeApiKey!, { //process.env.STRIPE_API_KEY!
            apiVersion: "2023-08-16",
            typescript: true,
        })
        

        const userSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId:decodedToken.id
            }
        });

        if(userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
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
            customer_email: decodedToken.email, //user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: planSelected.name,
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: planSelected.price * 100,  //20$ 
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId: decodedToken.id,
                tokens: planSelected.tokens,
                businessProfiles: planSelected.businessProfiles,
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