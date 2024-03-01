'use client'

import { Suspense } from "react";
import Sites from "@/components/sites";
import OverviewStats from "@/components/overview-stats";
import Posts from "@/components/posts";
import Link from "next/link";
import PlaceholderCard from "@/components/placeholder-card";
import OverviewSitesCTA from "@/components/overview-sites-cta";

import { Card } from "@/components/ui/card";
import { ArrowRight, PlusCircleIcon, Coins, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label:'My Sites',
    icon: GalleryVerticalEnd,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/sites'
  },
  {
    label:'Create A New Site',
    icon: PlusCircleIcon,
    color: 'text-green-500',
    bgColor: 'bg-blue-500/10',
    href: '/create-site'
  },
  {
    label:'Subscription Plan',
    icon: Coins,
    color: 'text-yellow-500',
    bgColor: 'bg-violet-500/10',
    href: '/plan'
  }
]


export default function Overview() {

  const { push } = useRouter();

  return (
    <div className="p-5">
      <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
        Launch a website today & start earning
      </h2>

    <div className="flex items-center justify-center">
      <p className='text-sm md:text-lg text-center w-fit bg-white px-2 rounded font-light'>
        Customize your site details & let us handle the rest  🚀
      </p>
    </div>

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
  );
}


/*
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>
        <OverviewStats />
      </div>

     <div className="flex flex-col space-y-6">
         <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Top Sites
          </h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Recent Posts
        </h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Posts limit={8} />
        </Suspense>
      </div>
*/