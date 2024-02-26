"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
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
}


const MobileSidebar = ({
    apiLimitCount = { tokensUsed:0, businessProfilesUsed:0 ,customEmployeesUsed:0},
    isPro = {isPro:false, tokensAllowed: 0, businessProfilesAllowed:0, customEmployeesAllowed:0},
    logo="",
    siteName="",
}: MobileSidebarProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return ( 

        <Sheet>
            <SheetTrigger>

                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
                <Sidebar  logo={logo} siteName={siteName} />
            </SheetContent>

        </Sheet>
     );
}
 
export default MobileSidebar;