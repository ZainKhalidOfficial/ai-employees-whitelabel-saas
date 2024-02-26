import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { increaseApiLimit } from "@/lib/api-limit";

export async function POST(req: Request) {
    try {

        const body = await req.json();
        // const user = await currentUser();
        const { name, profileData } = body;

        let decodedToken: any = "";

        try {
            const token = cookies().get('token')?. value || '';
    
            decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
            // console.log("data : ", decodedToken.id);
        
        } catch (error) { 
            console.log("Custom Auth failed exception at expertChat page.tsx : ",error)

            return new NextResponse("Unauthorized", { status: 401 });
            // router.push("/login");
        }

        if(!decodedToken.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!name || !profileData) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //TODO: Check for subscription

        const expert = await prisma.businessProfile.create({
            data : {
                userId: decodedToken.id,
                userName: decodedToken.username,

                name,
                profileData
            }
        });

        await increaseApiLimit('businessProfiles');
        
        return NextResponse.json(expert);

    } catch (error) {
        console.log("BUSINESS_PROFILE_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}