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
import { getDomainName } from "@/app/helpers/getDomainName";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
  }

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

    let domainName = getDomainName();

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();


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
