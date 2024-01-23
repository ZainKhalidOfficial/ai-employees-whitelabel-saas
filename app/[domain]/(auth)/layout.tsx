// Developer Message 4 
// This common layout applied to all routes in the neighbouring (route) folder.

import { ReactNode } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login / Signup",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
     );
}
 


