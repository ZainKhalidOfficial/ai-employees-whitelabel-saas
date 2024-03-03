'use client'

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";

export default function LogoutUsers() {

  return (
    <form
    action={logout}
    > 
    <div className="flex w-full items-center justify-center">
    <Button
      type="submit"
      className="w-1/3 bg-slate-500 gap-2">
      <p>Logout</p> <LogOut width={18} />

      </Button>
      </div>
      </form>
  );
}
