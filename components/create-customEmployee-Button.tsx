"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface CreateCustomEmployeeButtonProps {
  customEmployeesUsed: number;
  customEmployeesAllowed: number;
};


export const CreateCustomEmployeeButton = ({
  customEmployeesUsed,
  customEmployeesAllowed
}:CreateCustomEmployeeButtonProps) => {

    const router = useRouter();
    

    const onClick = () => {
      router.push("/customExpert/new")
    }


    if(customEmployeesUsed>=customEmployeesAllowed)
    {
      return (
      <>
        <p className="text-md mx-auto w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/8  p-2 rounded-xl bg-white m-5 text-purple-900">Limit Reached</p>
        <p className="text-md m-5 text-muted-foreground">{customEmployeesUsed} / {customEmployeesAllowed} Remaining</p>
      </>
        ); 
    }

    return (
      <>
      <Button size="lg" onClick={onClick} disabled={false}>
      Create a new Custom Employee
      <Plus className="w-4 h-4 ml-2" />
      </Button>
      <p className="text-md m-5 text-muted-foreground">{customEmployeesUsed} / {customEmployeesAllowed} Remaining</p>
      </>
      
    )
}
