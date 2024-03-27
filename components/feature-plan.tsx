"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap, CircleDollarSign, Coins, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Companion } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { Check, PointerIcon } from "lucide-react";
import { useRouter } from "next/navigation";




export const WhitelabelFeaturePlan =() => {


    return (
            <div  className="flex  flex-col items-center">
        

            
            <div className="grid text-center gap-y-5 font-semibold grid-cols-1 w-2/3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-4">
            
                    <Card
                    className="bg-black rounded-full items-center text-white m-2 "
                    >
                          <div className="flex top-0 -translate-y-5 items-center justify-center">
                            <div className="bg-[#7075F3] w-20 h-20 rounded-full flex items-center justify-center">
                            <p className="text-white font-bold text-lg">1</p>
                            </div>
                          </div>

                            <CardHeader className="flex items-center mb-10 text-center ">

                                <p className="text-xl font-bold">
                                Ready-To-Go
                                </p>
        

                            </CardHeader>

                            <CardContent className="space-y-2 text-lg mb-10 ">
                            <p>Navigate your <span className="text-[#7075F3]"> user-friendly </span> 
                            platform with <span className="text-[#7075F3]">no coding.</span> Reach a global audience with support for <span className="text-[#7075F3]">over 95 languages.</span> Your platform is <span className="text-[#7075F3]">Ready-To-Go.</span></p>

                            </CardContent>
                            {/* <CardFooter className="flex items-center justify-center text-xs text-muted-foreground">
                                       
                            </CardFooter> */}
                        

                    </Card>

                    <Card
                    className="bg-black rounded-full text-white m-2"
                    >

                        <div className="flex top-0 -translate-y-5 items-center justify-center">
                            <div className="bg-[#7075F3] w-20 h-20 rounded-full flex items-center justify-center">
                            <p className="text-white font-bold text-lg">2</p>
                            </div>
                          </div>

                            <CardHeader className="flex items-center mb-10 text-center ">

                                <p className="text-xl font-bold">
                                Features
                                </p>
        

                            </CardHeader>

                            <CardContent className="space-y-2 text-lg mb-10 ">
                            <p><span className="text-[#7075F3]">Specialized AI-employees</span> and <span className="text-[#7075F3]">advanced AI tools</span>. Set <span className="text-[#7075F3]">your own pricing plans</span> and <span className="text-[#7075F3]">brand</span>, you keep <span className="text-[#7075F3]">100%</span> of the <span className="text-[#7075F3]">profit</span>. Ensured safety with <span className="text-[#7075F3]">GDPR certification</span>. Exclusive <span className="text-[#7075F3]">Custom AI-employee</span> creation for <span className="text-[#7075F3]">Premium</span> users.</p>

                            </CardContent>
                            {/* <CardFooter className="flex items-center justify-center text-xs text-muted-foreground">
                                       
                            </CardFooter> */}
                        

                    </Card>

                    <Card
                    className="bg-black rounded-full text-white cursor-pointer m-2"
                    >

                        <div className="flex top-0 -translate-y-5 items-center justify-center">
                            <div className="bg-[#7075F3] w-20 h-20 rounded-full flex items-center justify-center">
                            <p className="text-white font-bold text-lg">3</p>
                            </div>
                          </div>

                            <CardHeader className="flex items-center mb-10 text-center ">

                                <p className="text-xl font-bold">
                                Scale & Support
                                </p>
        

                            </CardHeader>

                            <CardContent className="space-y-2 text-lg mb-10 ">
                            <p>Grow at <span className="text-[#7075F3]">your pace</span> with a platform that 
                            <span className="text-[#7075F3]">scales</span> with your needs. Rely on our dedicated 
                            <span className="text-[#7075F3]">support</span> team for <span className="text-[#7075F3]">guidance</span> 
                            and <span className="text-[#7075F3]">issues</span>.</p>

                            </CardContent>
                            {/* <CardFooter className="flex items-center justify-center text-xs text-muted-foreground">
                                       
                            </CardFooter> */}
                        

                    </Card>
                
            
        </div>

      
  </div>
    )

}
/*
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
*/