'use client'

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Wrench, Building2, Users2, Plus, Settings } from "lucide-react";

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
    href: '/expertChat',
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
    href: '/businessProfiles',
    color: 'text-emerald-700',
    },
   {
    label: 'Custom Experts',
    icon: Plus,
    href: '/customExpert',
    color: 'text-violet-500',
    },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
   },
]
 

const SidebarNavigate =()=> {

    const pathname = usePathname();

    return (

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
    )

}

export default SidebarNavigate;