import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { decreaseApiLimit } from "@/lib/api-limit";

export async function PATCH(
    req: Request,
    { params }: { params: { businessProfileId: string}}
    ) {
    try {
        const body = await req.json();
        // const user = await currentUser();
        const {  name, profileData  } = body;

        
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

        if(!params.businessProfileId) {
            return new NextResponse("Companion ID is required", { status : 400});
        }

        if(!decodedToken.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!name || !profileData ) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //TODO: Check for subscription

        const expert = await prisma.businessProfile.update({
            where: {
                id: params.businessProfileId,
                userId: decodedToken.id,
            },
            data : {
                userId: decodedToken.id,
                userName: decodedToken.username,

                name,
                profileData
            }
        });

        return NextResponse.json(expert);

    } catch (error) {
        console.log("BUSINESS_PROFILE_PATCH", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { businessProfileId: string }}
) {
    try {

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
            return new NextResponse("Unauthorized", { status: 401});
        }

        const businessProfile = await prisma.businessProfile.delete({
            where: {
                userId : decodedToken.id,
                id: params.businessProfileId,
            }
        });

        await decreaseApiLimit('businessProfiles');

        return NextResponse.json(businessProfile);

    } catch (error) {
        console.log("[BUSINESS_PROFILE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}