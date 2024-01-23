"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Music, ImageIcon, PlusCircleIcon, Code, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
const tools = [
  {
    label:'Experts',
    icon: Users2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/expertsPage'
  },
  {
    label:'Create Custom Experts',
    icon: PlusCircleIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/customExpertPage'
  },
  {
    label:'General Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  },
  // {
  //   label:'Music Generation',
  //   icon: Music,
  //   color: 'text-emerald-500',
  //   bgColor: 'bg-emerald-500/10',
  //   href: '/music'
  // }
  // ,
  {
    label:'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image'
  }
  ,
  // {
  //   label:'Video Generation',
  //   icon: VideoIcon,
  //   color: 'text-green-700',
  //   bgColor: 'bg-green-700/10',
  //   href: '/video'
  // }
  // ,
  {
    label:'Code Generation',
    icon: Code,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/code'
  }
]

 const DashboardPage = () => {

   const { push } = useRouter();

  //   const [data, setData] = useState("nothing");
  //   const [isSuccess, setIsSuccess] = useState<boolean>(false);

  //   useEffect(() => {
  //   (async () => {

  //       const res = await axios.get('/api/authusers/me');
  //       console.log(res.data);
  //       setData(res.data.user);
  
  //     // if the error did not happen, if everything is alright
  //     setIsSuccess(true);
  //   })();
  // }, [push]);

  // if (!isSuccess) {
  //   return <p>Loading...</p>;
  // }
  
  
  return (
    <div>
      <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
        Explore The Power Of AI
      </h2>

      <p className='text-muted-foreground font-light text-sm md:text-lg text-center '>
        Chat with the power of AI - Experience The Power Of AI
      </p>
      </div>

      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {tools.map((tool) => (
          <Card 
          onClick={() => push(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold" >
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>

    </div>
    
  )
}

export default DashboardPage;
