import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-gradient-to-r from-purple-200 via-blue-300 to-indigo-200 pt-5 sm:pt-0 sm:pl-60">{children}</div>
    </div>
  );
}
