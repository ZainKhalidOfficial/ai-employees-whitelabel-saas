
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePageLayout({ children }: { children: ReactNode }) {
  return (
            {children}
     );
}
 


