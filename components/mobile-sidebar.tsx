
'use client'
import { Link, LogOut, Menu, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "@/components/sidebar";
import { Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@radix-ui/react-progress";
import { Card } from "@tremor/react";
import { FreeCounter } from "./free-counter";
import LogoutUsers from "./logout-users";
import SidebarNavigate from "./sidebar-navigate";
import { CardContent } from "./ui/card";
import { FreeCounterDisplay } from "./free-counter-display";
import Image from "next/image";
import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

interface MobileSidebarProps {
    apiLimitCount: {
        tokensUsed: number;
        businessProfilesUsed: number;
        customEmployeesUsed: number;
    };
    isPro: {
        isPro: boolean;
        tokensAllowed: number;
        businessProfilesAllowed: number;
        customEmployeesAllowed: number;
    };
    logo: String | null;
    siteName: String | null;
}


const MobileSidebar = ({
    apiLimitCount = { tokensUsed: 0, businessProfilesUsed: 0, customEmployeesUsed: 0 },
    isPro = { isPro: false, tokensAllowed: 0, businessProfilesAllowed: 0, customEmployeesAllowed: 0 },
    logo = "",
    siteName = "",
}: MobileSidebarProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (

        <Sheet>
            <SheetTrigger>

                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>

            </SheetTrigger>

            <SheetContent side="left" className="p-0" >
                {/* <Sidebar logo={logo} siteName={siteName}/>  */}
                <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">

                    <div className="px-3 py-2 flex-1">

                        {/* <Link href="/dashboard" className="flex items-center pl-3 mb-14"> */}
                        <div className="flex items-center pl-3 mb-14">
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
                        </div>
                        {/* </Link> */}


                        <SidebarNavigate />

                    </div>

                    <FreeCounterDisplay isPro={isPro} apiLimitCount={apiLimitCount} />

                    <LogoutUsers />

                </div>
            </SheetContent>

        </Sheet>
    );
}

export default MobileSidebar;