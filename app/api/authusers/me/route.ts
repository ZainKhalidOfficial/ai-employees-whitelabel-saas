import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { TenantUser } from "@prisma/client";
import prisma from "@/lib/prisma";


export async function GET(request:NextRequest) {

    try {
        
        const userId = await getDataFromToken(request);
        const user = await prisma.tenantUser.findUnique({
            where: {id: userId},
           
            // select: {
            //     id: true,
            //     username: true,
            //     email: true,     
            //   },
        })

        return NextResponse.json({user});

    } catch (error: any) {

        return NextResponse.json({error: error.message},
            {status: 400});
        
    }
    
}