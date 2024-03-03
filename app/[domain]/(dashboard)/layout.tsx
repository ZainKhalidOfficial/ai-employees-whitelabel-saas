import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import axios, { AxiosError } from "axios";

import { Suspense } from "react";
import { getSiteData } from "@/lib/fetchers";
import { notFound } from "next/navigation";
import { getDomainName } from "@/app/helpers/getDomainName";
import MobileSidebar from "@/components/mobile-sidebar";
import { logout } from "@/lib/actions";

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

  const [data] = await Promise.all([  //[data, posts] 
    getSiteData(String(domainName.hostname)), //?.value
  ]);


  if (!data || !domainName) {

    logout;
    notFound();
  }

  return (


    <div className="h-full relative">

      {/* <Suspense fallback={
        <div className="flex justify-center items-center gap-2 h-screen">
          <div className="rounded-md h-12 w-12 md: border-4 border-t-4 border-white animate-spin absolute"></div>
        </div>
      }> */}

        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">

          <Suspense> <Sidebar logo={data.logo} siteName={data.name} /> </Suspense>

        </div>
        <main className="md:pl-72 mx-auto h-full w-full">
           {/* <MobileSidebar logo={data.logo} siteName={data.name}/> */}
          
          <Suspense> <Navbar logo={data.logo} siteName={data.name} /> </Suspense>

          <Suspense fallback={
            <div className="flex justify-center items-center gap-2 h-screen">
              <div className="rounded-md h-12 w-12 md: border-4 border-t-4 border-white animate-spin absolute"></div>
            </div>
          }>

            {children}

          </Suspense>
        </main>
      {/* </Suspense> */}
    </div>

  );
}

export default DashboardLayout;
