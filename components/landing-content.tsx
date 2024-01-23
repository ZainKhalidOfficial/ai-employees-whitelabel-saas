"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Wrench, Building2, Users2, Plus, Bot, PencilRuler } from "lucide-react";

const testimonials = [
    {
        name: "AI Experts",
        avatar: Users2,
        title: "Software Engineer",
        color: 'text-violet-500',
        description: 'Our platform offers dozens of specialized "AI Expert" that can be used to solve your business problems quickly and cheaply. Save hours of prompt research and engineering and simply ask your AI Expert to solve your problem'
    },
    {
        name: "Smart Tools",
        avatar: Wrench,
        title: "Software Engineer",
        color: 'text-blue-700',
        description: "A pool of smart AI tools powered by advanced large language models. Embedded with specialized instructions and serviced with accessibility and functionality in mind. Provide help with content writing, coding writing and code debugging. "
    },
    {
        name: "Business Profiles",
        avatar: Building2,
        title: "Software Engineer",
        color: 'text-emerald-700',
        description: "Save your business details in multiple profiles, so that the AI experts know in advance your business details that you choose and guide your business to success and prosperity with expert advice and knowledge. "
    },
    {
        name: "Custom Experts",
        avatar: Plus,
        title: "Software Engineer",
        color: 'text-violet-500',
        description: "Create your own custom experts, prompt their behaviour and designate to them a category and title. Save hours of prompt research and engineering and simply ask your AI Expert to solve your problem"
    },
    {
        name: "LLM",
        avatar: Bot,
        title: "Software Engineer",
        color: 'text-sky-500',
        description: "Powered by advanced large language models like gpt-4 and gpt-3.5, enhanced via the power of advanced prompt engineering and chat seeding. Switch between models to save cost depending upon your use case. "
    },
    {
        name: "Whitelabel",
        avatar: PencilRuler,
        title: "Software Engineer",
        color: 'text-pink-700',
        description: "This platform is fully whitelabel! Add you own website title, logo, pricing plan, payment api and link your personal domain name. Own this platform as your own and grow your business with us."
    }
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Features
            </h2>

            <h2 className="text-center text-lg text-white  mb-10">
            These AI experts help you start and scale small businesses by providing expert advice and performing advanced, time-consuming tasks like writing, research, and planning.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className=" bg-white m-5 hover:bg-purple-50 text-black">
                        <CardHeader className="items-center">
                        <item.avatar className={cn(" w-10, h-10",item.color)} />
                            <CardTitle className="text-center justify-center items-center gap-x-2">

                                

                                <div>
                                    <p className="text-lg"> {item.name} </p>
                                  
                                </div>
                            </CardTitle>
                            <CardContent className="pt-0 px-0 text-center">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}