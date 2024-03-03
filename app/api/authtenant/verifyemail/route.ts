import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;

        var currentDateTime = new Date();
        console.log("currentDateTime : ",currentDateTime)
        const user = await prisma.tenantUser.findFirst({
        where: {
            // AND: [
            //     {
                verifyToken: token,
                // },
                // {
                    verifyTokenExpiry: {gt: currentDateTime} //(new Date(Date.now()))
                // }
            // ]
          }
        })

        console.log("verifyemail api : ", user)

        if(!user){
            return NextResponse.json({error: "Invalid token!"}, {status: 400, statusText: "Token expired!"})
        }

        await prisma.tenantUser.updateMany({
            where: {
                // AND: [
                //     {
                        verifyToken: token ,     
                    // },
                    // {
                        verifyTokenExpiry: {gt: currentDateTime}
                //     }
                // ]
              },
              data: {        
                isVerified: true,
                verifyToken:"undefined",
                verifyTokenExpiry: currentDateTime
              }
            })

            return NextResponse.json({message: "Email verified successfully"})
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500, statusText: "Failed to verify email"})
    }

}