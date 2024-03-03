"use server"

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ModeToggle } from "@/components/mode-toggle";
import LogoutUsers from "./logout-users";

interface NavbarProps {

    logo: String|null;
    siteName: String|null; 
};


const Navbar = async({
    logo="",
    siteName="", 
}:NavbarProps) => {

    const [isPro, apiLimitCount] = await Promise.all([  
    checkSubscription(), 
    getApiLimitCount()
  ]);

    return ( 
        <div className="flex items-center p-2">
            
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount}  logo={logo} siteName={siteName}/>

            {/* <div className="flex w-full items-center justify-end gap-x-3">
                <ModeToggle />
                <UserButton afterSignOutUrl="/"/>
            </div> */}

        </div>
     );
}
 
export default Navbar;