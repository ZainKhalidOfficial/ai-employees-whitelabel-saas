
import { ReactNode, Suspense } from "react";
import { Metadata } from "next";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "General Conversation",
};

export default function ConversationLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="text-violet-500/10"
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



