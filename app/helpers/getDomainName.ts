
import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";
import { cookies } from "next/headers";

export const getDomainName = () => {

    const cookieStore = cookies()

    let domainName: any = "";

    try {
        const domaintoken = cookies().get('domainParams')?. value || '';

        domainName = jwt.verify(domaintoken , process.env.JWT_SECRET!)

        return domainName;
    
    } catch (error) { 
        console.log("Domain name missing exception at getDomainName.ts : ",error)

        return new NextResponse("Unauthorized", { status: 401 });
    }
}