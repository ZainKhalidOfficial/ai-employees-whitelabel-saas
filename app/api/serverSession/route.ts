import { getUserToken } from "@/app/helpers/getUserToken";
import { NextRequest,NextResponse } from "next/server";
import { TenantUser } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";


export async function GET(request:NextRequest) {

    try {
        
        const session = await getDataFromToken(request);
        
        if(!session)
        {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return NextResponse.json({session});

    } catch (error: any) {

        return NextResponse.json({error: error.message},
            {status: 400});
        
    }
    
}