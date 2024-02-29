
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Tools",
};

{/* <Suspense fallback={
  <div className="flex justify-center items-center gap-2 h-screen">
    <div className="rounded-md h-12 w-12 md: border-4 border-t-4 border-white animate-spin absolute"></div>
  </div>
}>
  {children}

</Suspense> */}

export default function ToolsPageLayout({ children }: { children: ReactNode }) {
  return (
    children
  );
}



