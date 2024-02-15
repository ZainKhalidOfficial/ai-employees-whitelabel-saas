"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, MessageSquare, Music, ImageIcon, PlusCircleIcon, Code, Users2, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label:'Experts',
    icon: Users2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/expertChat'
  },
  {
    label:'Create Custom Experts',
    icon: PlusCircleIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/customExpert'
  },
  {
    label:'General Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  },
  {
    label:'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image'
  }
  ,
  {
    label:'Business Profiles',
    icon: Building,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/businessProfiles'
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

 const DashboardPage = () => {

   const { push } = useRouter();
  
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
