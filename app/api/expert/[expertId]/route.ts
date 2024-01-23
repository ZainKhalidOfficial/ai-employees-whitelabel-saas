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
    { params }: { params: { expertId: string}}
    ) {
    try {
        const body = await req.json();
        // const user = await currentUser();
        const {  name, description, instructions, seed, src,categoryId  } = body;

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

        if(!params.expertId) {
            return new NextResponse("Companion ID is required", { status : 400});
        }

        if(!decodedToken.id ) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!name || !description || !instructions || !seed || !src || !categoryId) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //TODO: Check for subscription

        const expert = await prisma.companion.update({
            where: {
                id: params.expertId,
                userId: decodedToken.id,
            },
            data : {
                categoryId,
                userId: decodedToken.id,
                userName: decodedToken.username,
                src,
                name,
                description,
                instructions,
                seed
            }
        });

        return NextResponse.json(expert);

    } catch (error) {
        console.log("EXPERT_PATCH", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { expertId: string }}
) {
    try {

        let decodedToken: any = "";

        try {
            const token = cookies().get('token')?. value || '';
    
            decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
            // console.log("data : ", decodedToken.id);
        
        } catch (error) { 
            console.log("Custom Auth failed exception : ",error)

            return new NextResponse("Unauthorized", { status: 401 });
            // router.push("/login");
        }

        const expert = await prisma.companion.delete({
            where: {
                userId:decodedToken.id,
                id: params.expertId,
            }
        });

        await decreaseApiLimit('customEmployees');

        return NextResponse.json(expert);

    } catch (error) {
        console.log("[COMPANION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500});
    }
}