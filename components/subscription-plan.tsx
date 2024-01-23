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
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";


interface SubscriptionPlanProps {
    isPro: {isPro: boolean;
        tokens: number;};

    disabled: boolean;

    planData: {
        silverPackagePrice: number;
        silverTokens:number;
        silverBusinessProfiles:number;
        silverCustomEmployees:number;
        
        goldPackagePrice:number;
        goldTokens:number;
        goldBusinessProfiles:number;
        goldCustomEmployees:number;
    
        platinumPackagePrice:number;
        platinumTokens:number;
        platinumBusinessProfiles:number;
        platinumCustomEmployees:number;
    }
};   

export const SubscriptionPlan =({
    isPro= { isPro: false,
             tokens: 0},
    disabled = false,
    
    planData= {
        silverPackagePrice:0,
        silverTokens:0,
        silverBusinessProfiles:0,
        silverCustomEmployees:0,
        
        goldPackagePrice:0,
        goldTokens:0,
        goldBusinessProfiles:0,
        goldCustomEmployees:0,
    
        platinumPackagePrice:0,
        platinumTokens:0,
        platinumBusinessProfiles:0,
        platinumCustomEmployees:0,
    }
}: SubscriptionPlanProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    
    const data = [
        {   id: 1, // this id is used send to stripe for payment processing check button at the end
            label: 'Silver Tier',
            tokens: planData.silverTokens,
            cost: planData.silverPackagePrice,
            one: 'All Classic Employees, Plus:',
            two: 'Access to Startup Tools',
            three: 'Full Access to GPT-4',
            four: `${planData.silverBusinessProfiles} Business Profiles`,
            five: `${planData.silverCustomEmployees} Custom Experts`,
            icon: CircleDollarSign,
            href: '/dashboard',
            color: 'text-sky-500',
        },
        {   id: 2,
            label: 'Gold Tier',
            tokens: planData.goldTokens,
            cost: planData.goldPackagePrice,
            one: 'Everthing in Startup, Plus:',
            two: 'All Employees',
            three: 'Access to Mid-Size Tools',
            four: `${planData.goldBusinessProfiles} Business Profiles`,
            five: `${planData.goldCustomEmployees} Custom Experts`,
            icon: Coins,
            href: '/dashboard',
            color: 'text-sky-500',
        },
        {   id: 3,
            label: 'Platinum Tier',
            tokens: planData.platinumTokens,
            cost: planData.platinumPackagePrice,
            one: 'Everthing in Mid-Size, Plus:',
            two: 'Whitelabel',
            three: 'Access to all Tools',
            four: `${planData.platinumBusinessProfiles} Business Profiles`,
            five: `${planData.platinumCustomEmployees} Custom Experts`,
            icon: Building2,
            href: '/dashboard',
            color: 'text-sky-500',
        },
    
    ]


    const onClick = async (ordertype: number) => {
        
    if(disabled)
    {
        router.push('/sign-up');   
    } else {

        let planSelected = {};
        if(ordertype === 1)
        {
            planSelected = {
                name:data[0].label, 
                price:planData.silverPackagePrice, 
                tokens: planData.silverTokens,
                businessProfiles: planData.silverBusinessProfiles,
                customExperts: planData.goldCustomEmployees}
        } else if(ordertype === 2)
        {
            planSelected = {
                name:data[1].label,  
                price:planData.goldPackagePrice,
                tokens: planData.goldTokens,
                businessProfiles: planData.goldBusinessProfiles,
                customExperts: planData.goldCustomEmployees}
        }else if(ordertype === 3)
        {
            planSelected = {
                name:data[2].label,
                price:planData.platinumPackagePrice,  
                tokens: planData.platinumTokens,
                businessProfiles: planData.platinumBusinessProfiles,
                customExperts: planData.platinumCustomEmployees}
        }

            try {      
                setLoading(true);
                const response = await axios.post("/api/stripe",{planSelected:planSelected}); //get request replaced

                window.location.href = response.data.url;
                
            } catch (error) {
                console.log("BILLING_ERROR", error)
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
    }
        
        
        
    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-10">
            {
                data.map((item) => (
                    <Card
                    key={item.id}
                    className="bg-slate-200 rounded-xl text-gray-600 cursor-pointer m-5 hover:m-2 hover:bg-black hover:text-white transition"
                    >
                            <CardHeader className="flex items-center mb-10 text-center ">

                                <item.icon className="w-14 h-14" />

                                <p className="text-xl font-bold">
                                    {item.label}
                                </p>
                                <p className="text-lg">
                                    {item.tokens} Tokens
                                </p>

                                <p className="text-md font-bold">
                                    {item.cost} USD
                                </p>

                                <Button disabled={true} className="rounded-full px-10 text-md" variant={"default"}>
                                    Monthly
                                </Button>

                            </CardHeader>

                            <CardContent className="pl-20 space-y-2 mb-10 ">

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600 "} />
                                <p className="text-md">
                                    {item.one}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.two}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.three}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.four}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.five}
                                </p>
                            </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-center text-xs text-muted-foreground">
                             
                        

                             <Button disabled={loading} variant={isPro.isPro ? "default" : "premium"} className="px-10 rounded-full" onClick={() => onClick(item.id)}>
                                 <p>Get Now</p>
                                <Zap className="w-4 h-4 ml-2 fill-white" />
                             </Button>

                            </CardFooter>
                        

                    </Card>
                ))
            }
        </div>
        
    )
}

/*
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
*/