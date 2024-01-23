"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Wrench, Building2, Users2, Plus, Settings } from "lucide-react";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({weight:"600" , subsets:["latin"]})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
   {
    label: 'Experts',
    icon: Users2,
    href: '/expertsPage',
    color: 'text-violet-500',
   },
   {
    label: 'Smart Tools',
    icon: Wrench,
    href: '/tools',
    color: 'text-blue-700',
    },
    {
    label: 'Business Profiles',
    icon: Building2,
    href: '/businessProfilesPage',
    color: 'text-emerald-700',
    },
   {
    label: 'Custom Experts',
    icon: Plus,
    href: '/customExpertPage',
    color: 'text-violet-500',
    },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
   },
]
 

interface SidebarProps {
    apiLimitCount: {
        tokensUsed:number;
        businessProfilesUsed:number;
        customEmployeesUsed:number;
    };
    isPro: {
        isPro: boolean;
        tokensAllowed: number;
        businessProfilesAllowed:number;
        customEmployeesAllowed:number;
    }; 

    logo: String|null;
    siteName: String|null; 
};

const Sidebar = ({
    apiLimitCount = { tokensUsed:0, businessProfilesUsed:0 ,customEmployeesUsed:0},
    isPro = {isPro:false, tokensAllowed: 0, businessProfilesAllowed:0, customEmployeesAllowed:0},
    logo="",
    siteName="",
}: SidebarProps) => {

    const pathname = usePathname();

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

                        <h1 className={cn("text-2xl font-bold",montserrat.className)}>
                            {siteName}
                        </h1>
                    
                    </Link>

                    <div className="space-y-1">

                        {
                            routes.map((route) => (
                                <Link
                                href={route.href}
                                key={route.href}
                                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400" )}
                                >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                    {route.label}
                                </div>
                                </Link>
                            ))
                        }

                    </div>

                </div>
            <FreeCounter
                isPro={isPro}    
                apiLimitCount={apiLimitCount}
            />
        </div>
     );
}
 

export default Sidebar;