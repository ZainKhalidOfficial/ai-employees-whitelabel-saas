import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { increaseApiLimit } from "@/lib/api-limit";

export async function POST(req: Request) {
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

        const body = await req.json();

        const {  name, description, instructions, seed, src,categoryId  } = body;

        if(!decodedToken.id) {  //!user.firstName
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!name || !description || !instructions || !seed || !src || !categoryId) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //TODO: Check for subscription

        const expert = await prisma.companion.create({
            data : {
                categoryId,
                userId: decodedToken.id,
                userName: decodedToken.username,  //user.firstName
                src,
                name,
                description,
                instructions,
                seed
            }
        });

        await increaseApiLimit('customEmployees');
        
        return NextResponse.json(expert);

    } catch (error) {
        console.log("EXPERT_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}