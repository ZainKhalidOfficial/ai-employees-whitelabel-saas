
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        if(!username || !email || !password) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //check if user already exists
        const user = await prisma.tenantUser.findUnique({
            where: {email}
        })
        
        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        

                
        const newUser = await prisma.tenantUser.create({
             data: {
                username,
                email,
                password: hashedPassword,
            },
    
        });

        return NextResponse.json({
        message: "User created successfully",
        success: true,
        newUser
        });

    } catch (error: any) {
        console.log("Signup API Failed: ", error.message)
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}