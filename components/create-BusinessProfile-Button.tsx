"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import axios from "axios";


export const CreateBusinessProfileButton = () => {

    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    const [businessProfilesUsed, setbusinessProfiles] = useState(0);
    const [businessProfilesAllowed, setbusinessProfilesAllowed] = useState(0);

    
    useEffect(() => {
      
        const fetchData = async () => {
          const responce =  await axios.get("/api/subscriptionStatus");
          
          
          setbusinessProfilesAllowed(responce.data.businessProfilesAllowed);
          setbusinessProfiles(responce.data.businessProfilesUsed)
          setMounted(true);
        
      };

      fetchData();
       
    }, []);

    const onClick = () => {
      router.push("/businessProfiles/new")
    }

    if(!mounted) {
      return (

      <p className="text-md mx-auto w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/8  h-50 rounded-x m-5 text-white">Loading status...</p>
    
      );
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