import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Signup",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-900"> {/* bg-gradient-to-r from-purple-200 via-blue-300 to-indigo-200 */}
      {children}
    </div>
  );
}
