import { Suspense } from "react";
import Sites from "@/components/sites";
import PlaceholderCard from "@/components/placeholder-card";
import CreateSiteButton from "@/components/create-site-button";
import CreateSiteModal from "@/components/modal/create-site";

export default function CreateSite({ params }: { params: { id: string } }) {
  return (
    
        <div className="flex w-full h-screen items-center justify-center p-8">

          {/* <CreateSiteButton> */}
            <CreateSiteModal />
          {/* </CreateSiteButton> */}
          
        </div>
  );
}
