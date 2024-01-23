"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Wrench, Building2, Users2, Plus, Bot, PencilRuler } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

interface FooterContentProps {
  logo: String|null;
  siteName: String|null;
};   


export const FooterContent = ({
  logo,
  siteName
}:FooterContentProps) => {
    return (
        <footer className="bg-gray-800 text-white py-16">

        <div className="container mx-auto flex justify-between items-center">

          <div className="">

            <div className="text-gray-100 text-lg">Policy</div>
            <ul className=" text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-white">GDPR Compliance</a></li>
            </ul>
          </div>


          <div className="text-xl font-bold">
          <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                    fill
                    alt="Logo"
                    src={String(logo)}
                    />   
                </div>
                <h1 className={cn("text-xl font-bold text-white", font.className)}>
                        {siteName}
                    </h1>
            </Link>
          </div>

        </div>

      </footer>
    )
}