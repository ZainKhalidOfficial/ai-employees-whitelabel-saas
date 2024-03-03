'use client'
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions";

export default function LogoutButton() {

  return (
    <form
    action={logout}
    >
    <button
    type="submit"
    className="rounded-lg p-1.5 text-stone-300 transition-all duration-150 ease-in-out hover:bg-stone-200 hover:text-stone-700 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
    >
      <LogOut width={18} />
    </button>
      </form>
      
  );
}
