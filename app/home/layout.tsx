"use client"
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
// import "./globals2.css";

//2
import Footer from "@/components/home2/Footer";
import Header from "@/components/home2/Header";

// import "node_modules/react-modal-video/css/modal-video.css";
import "@/styles1/index.css";


const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}
) => {  //bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-900 overflow-auto
    return ( 
        <main className="h-full overflow-auto ${inter.className}" suppressHydrationWarning>

            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
            
            {/* <ScrollToTop /> */}


        </main>
     );
} //bg-[#111827] //mx-auto max-w-screen-xl
 
export default LandingLayout;