
import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Music, ImageIcon, VideoIcon, Code, Users2, Wand2, Plus, Import, Building } from "lucide-react";
import { cn } from "@/lib/utils";

import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { CreateBusinessProfileButton } from "@/components/create-BusinessProfile-Button";
import Link from "next/link";
import { auth, redirectToSignIn, useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { BusinessProfileListPage } from "@/components/businessProfiles";

const tools = [

  {
    label:'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  },
  {
    label:'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/music'
  }
  ,
  {
    label:'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image'
  }
  ,
  {
    label:'Video Generation',
    icon: VideoIcon,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/video'
  }
  ,
  {
    label:'Code Generation',
    icon: Code,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/code'
  }
]

 const ToolsPage = async () => {

  // const userId = auth();

  // if(!userId) {
  //     return redirectToSignIn();
  // }

  // let data;

  // if (!userId) {
  //     return new NextResponse("Unauthorized", { status: 401 });
  // }

//   data = await prismadb.businessProfile.findMany({
//       where: {
//           userId: userId
//       },
//     orderBy: {
//         createdAt: "desc"
//     }
// })

// const router = useRouter();


  return (
    <div>
      <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
      Business Profiles
      </h2>

      <p className='text-muted-foreground font-light text-sm md:text-lg text-center '>
        Create and save your business profiles for later use in conversations with your experts
      </p>
      </div>

      <div className="w-full mx-auto m-10 text-center items-center justify-center">
                               
      <CreateBusinessProfileButton /> 

      </div>

      <BusinessProfileListPage />

    </div>
    
  )
}

export default ToolsPage;


/*
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
*/