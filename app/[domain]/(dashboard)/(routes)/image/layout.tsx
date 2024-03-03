
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Generation",
};

export default function ImagePageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="text-pink-700/10"
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



