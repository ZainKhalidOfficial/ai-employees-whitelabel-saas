

import { BusinessProfile} from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { Building } from "lucide-react";


import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import prisma from "@/lib/prisma";
import { cookies } from 'next/headers'
import  jwt  from "jsonwebtoken";

export const BusinessProfileListPage = async () => {

    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) {
        console.log("Custom Auth failed exception : ",error)
        // router.push("/login");
    }

    let data;
    data = await prisma.businessProfile.findMany({
        where: {
            userId: decodedToken.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    
    if(data.length === 0) {
        return (
            <div className="pt-10 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-60 h-60">
                    <Image
                        fill
                        className="grayscale"
                        alt="Empty"
                        src="/empty2.png"
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    No business profiles found.
                </p>
            </div>
        )
    } else 
    {

    

    return (

        <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {data.map((item) => (
          <Card 
          key={item.id}
          className=" border-black/5  bg-primary/5 hover:shadow-md transition cursor-pointer"
          >
            <Link href={`/businessProfiles/${item.id}`} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md bg-emerald-500/20 text-emerald-700" )}>
              <Building className={cn("w-8 h-8" )} />
              </div>
              <div className="font-semibold" >
                {item.name}
              </div>

            </div>
             <div className="flex gap-x-5"> 
              <p>Go to Edit / Delete</p>
              <ArrowRight className="w-5 h-5" />
              </div>

            </Link>
          </Card>
        ))}
      </div>      
    )
          }
}