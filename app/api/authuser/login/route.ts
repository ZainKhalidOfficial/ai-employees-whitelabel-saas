
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
  
        
        if(!email || !password) {
            return new NextResponse("Missing required fields", { status:400 });
        }

        //check if user already exists
        const user = await prisma.tenantUser.findUnique({
            where: {email}
        })
        
        if(!user) {
            console.log("User doesn't exist!")
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})
        }

        //check password
        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }
        
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })

        response.cookies.set("token",token, {
             httpOnly: true
            })

        return response;

    } catch (error: any) {
        console.log("Login API Failed: ", error.message)
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}