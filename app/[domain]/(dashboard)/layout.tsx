import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {useState, useEffect } from "react";
import { cookies } from 'next/headers'
import  jwt  from "jsonwebtoken";
import { getSiteData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
  }

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {


    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    const cookieStore = cookies()
    // const domainName = cookieStore.get('domainName')


    let domainName: any = "";

    try {
        const domaintoken = cookies().get('domainParams')?. value || '';

        domainName = jwt.verify(domaintoken , process.env.JWT_SECRET!)
    
    } catch (error) { 
        console.log("Custom Auth failed exception at expertChat page.tsx : ",error)

        return new NextResponse("Unauthorized", { status: 401 });
    }

    const [data] = await Promise.all([  //[data, posts] 
    getSiteData(String(domainName.hostname)), //?.value
  ]);

  if (!data) {
    notFound();
  }

    

    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                
                    <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} logo={data.logo} siteName={data.name} />
                
            </div>
            <main className="md:pl-72 mx-auto h-full w-full">
                <Navbar logo={data.logo} siteName={data.name}  />
                {children}
            </main>
        </div>
     );
}
 
export default DashboardLayout;
