"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});


interface LandingNavbarProps {
    logo: String|null;
    siteName: String|null;
};   


export const LandingNavbar = ({
    logo,
    siteName,
}:LandingNavbarProps) => {

    // const { isSignedIn } = useAuth();
    const isSignedIn = true;
    
    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                    fill
                    alt="Logo"
                    src={String(logo)}
                    // src="/logo.png"
                    />   
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                        {siteName}
                    </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/login"}>
                    <Button variant={"outline"} className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}