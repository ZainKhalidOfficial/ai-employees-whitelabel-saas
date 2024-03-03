import { NextResponse } from "next/server";

export async function GET() {

    try {

        const response = NextResponse.json(
            {
                message: "Log out Successful.",
                success: true,
            }
        )

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(Date.now())
        });

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500, statusText: error.message});
    }
    
}