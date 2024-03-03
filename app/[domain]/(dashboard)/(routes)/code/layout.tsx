import { Heading } from "@/components/heading";
import { Code } from "lucide-react";
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code",
};

export default function CodeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code with descriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="text-green-700/10"
      />

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



