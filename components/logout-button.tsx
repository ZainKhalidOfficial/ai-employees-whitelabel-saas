"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutButton() {

  const router = useRouter();
  const { toast } = useToast();

  let deleteCookie = async () =>
  {
    try {

    const {data} =  await axios.get("/api/authuser/logout");

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
    <button
      onClick={() => deleteCookie()}
      className="rounded-lg p-1.5 text-stone-300 transition-all duration-150 ease-in-out hover:bg-stone-200 hover:text-stone-700 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
    >
      <LogOut width={18} />
    </button>
  );
}
