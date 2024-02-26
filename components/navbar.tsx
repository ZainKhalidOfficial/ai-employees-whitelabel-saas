import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {

    logo: String|null;
    siteName: String|null; 
};


const Navbar = async({
    logo="",
    siteName="", 
}:NavbarProps) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return ( 
        <div className="flex items-center p-2">
            
            <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} logo={logo} siteName={siteName}/>

            <div className="flex w-full items-center justify-end gap-x-3">
                {/* <ModeToggle /> */}
                {/* <UserButton afterSignOutUrl="/"/> */}
            </div>

        </div>
     );
}
 
export default Navbar;