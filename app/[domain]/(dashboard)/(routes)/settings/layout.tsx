import { Settings } from "lucide-react";
import { Heading } from "@/components/heading";
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account Settings"
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
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



