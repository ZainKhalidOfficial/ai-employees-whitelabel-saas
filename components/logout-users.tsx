"use client";

import { LogOut } from "lucide-react";
// import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function LogoutUsers() {

  const router = useRouter();
  const { toast } = useToast();

  let deleteCookie = async () =>
  {
    try {

    const {data} =  await axios.get("/api/authusers/logout");

    router.refresh();
  }
  catch (e) {
      toast({
          variant : "destructive",
          description : "Logout Failed",
      });

      const error = e as AxiosError;
  }
  }

  return (
    <div className="flex w-full items-center justify-center">
    <Button
      onClick={() => deleteCookie()}
      className="w-1/3 bg-slate-500 gap-2">
      <p>Logout</p> <LogOut width={18} />

      </Button>
      </div>
  );
}
