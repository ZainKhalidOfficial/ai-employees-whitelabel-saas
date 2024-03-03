"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface BusinessProfileProps {
  businessProfilesUsed: number;
  businessProfilesAllowed: number;
};

export const CreateBusinessProfileButton = ({
  businessProfilesUsed,
  businessProfilesAllowed
}: BusinessProfileProps) => {

    const router = useRouter();

    const onClick = () => {
      router.push("/businessProfiles/new")
    }

    if(businessProfilesUsed>=businessProfilesAllowed)
    {
      return (
      <>
        <p className="text-md mx-auto w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/8  p-2 rounded-xl bg-white m-5 text-purple-900">Limit Reached</p>
        <p className="text-md m-5 text-muted-foreground">{businessProfilesUsed} / {businessProfilesAllowed} Remaining</p>
      </>
        ); 
    }

    return (
      <>
      <Button size="lg" onClick={onClick} disabled={false}>
      Create a new Business Profile
      <Plus className="w-4 h-4 ml-2" />
      </Button>
      <p className="text-md m-5 text-muted-foreground">{businessProfilesUsed} / {businessProfilesAllowed} Remaining</p>
      </>
      
    )
}