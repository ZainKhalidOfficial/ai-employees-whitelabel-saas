// Developer Message 4 
// This common layout applied to all routes in the neighbouring (route) folder.

import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-full p-5">
      <Suspense fallback={
        <div className="flex justify-center items-center gap-2 h-screen">
          <div className="rounded-md h-12 w-12 md: border-4 border-t-4 border-white animate-spin absolute"></div>
        </div>
      }>
        {children}

      </Suspense>
    </div>
  );
}



