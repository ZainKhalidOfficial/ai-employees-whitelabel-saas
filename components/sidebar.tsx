"use server";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Wrench, Building2, Users2, Plus, Settings } from "lucide-react";
import { FreeCounter } from "@/components/free-counter";;
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import SidebarNavigate from "./sidebar-navigate";


import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

// const montserrat = Montserrat({weight:"600" , subsets:["latin"]})

interface SidebarProps {

    logo: String | null;
    siteName: String | null;
};

const Sidebar = async ({
    logo = "",
    siteName = "",
}: SidebarProps) => {

    // const router = useRouter();
    // const { toast } = useToast();

    // let deleteCookie = async () =>
    // {
    //   try {

    //   const {data} =  await axios.get("/api/authusers/logout");

    //   router.refresh();
    // }
    // catch (e) {
    //     toast({
    //         variant : "destructive",
    //         description : "Logout Failed",
    //     });

    //     const error = e as AxiosError;
    // }
    // }

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">

            <div className="px-3 py-2 flex-1">

                <Link href="/dashboard" className="flex items-center pl-3 mb-14">

                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src={String(logo)}
                        />
                    </div>

                    <h1 className={cn("text-2xl font-bold",)}> {/* montserrat.className */}
                        {siteName}
                    </h1>

                </Link>

                <SidebarNavigate />

            </div>

            <Suspense fallback={
                <div className="px-3">
                    <Card className="bg-white/10 border-0">
                        <CardContent className="py-6 ">
                            <div className="text-center text-sm text-white mb-4 space-y-2">
                                <p>
                                    0 / 0 Free Tokens Used
                                </p>
                                <Progress
                                    className="h-3"
                                    value={(0 / 1) * 100}
                                />
                            </div>
                            <Button className="w-full" variant="premium">
                                Get Pro Version <Zap className="w-4 h-4 ml-2 fill-white" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            }>
                <FreeCounter />

            </Suspense>
            {/* <div className="flex w-full items-center justify-center">
            <Button className="w-1/4 bg-slate-500" onClick={deleteCookie} >Logout</Button>
            </div> */}
        </div>
    );
}


export default Sidebar;