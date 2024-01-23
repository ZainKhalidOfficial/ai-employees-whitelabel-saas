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


interface SubscriptionPlanProps {
    isPro: {isPro: boolean;
        tokens: number;};

    disabled: boolean;

    planData: {
        id: string;
        userId: string;

        mStartupSitesAllowed: number;
        mStartupCustomEmployees: number;
        mStartupCustomDomains: string;
        mStartupPrice: number;
        
        yStartupSitesAllowed: number;
        yStartupCustomEmployees: number;
        yStartupCustomDomains: string;
        yStartupPrice: number;
      
        mMidsizeSitesAllowed: number;
        mMidsizeCustomEmployees: number;
        mMidsizeCustomDomains: string;
        mMidsizePrice: number;
      
        yMidsizeSitesAllowed: number;
        yMidsizeCustomEmployees: number;
        yMidsizeCustomDomains: string;
        yMidsizePrice: number;
      
        mEnterpriseSitesAllowed: number;
        mEnterpriseCustomEmployees: number;
        mEnterpriseCustomDomains: string;
        mEnterprisePrice: number;
        
        yEnterpriseSitesAllowed: number;
        yEnterpriseCustomEmployees: number;
        yEnterpriseCustomDomains: string;
        yEnterprisePrice: number;
    } | null;
};   

export const WhitelabelSubscriptionPlan =({
    isPro= { isPro: false,
             tokens: 0},
    disabled = false,
    
    planData= {
        id: '',
        userId: 'admin',

        mStartupSitesAllowed: 1,
        mStartupCustomEmployees: 0,
        mStartupCustomDomains: 'No',
        mStartupPrice: 100,
        
        yStartupSitesAllowed: 1,
        yStartupCustomEmployees: 0,
        yStartupCustomDomains: 'No',
        yStartupPrice: 1200,
      
        mMidsizeSitesAllowed: 1,
        mMidsizeCustomEmployees: 0,
        mMidsizeCustomDomains: 'Yes',
        mMidsizePrice: 150,
      
        yMidsizeSitesAllowed: 1,
        yMidsizeCustomEmployees: 0,
        yMidsizeCustomDomains: 'Yes',
        yMidsizePrice: 1800,
      
        mEnterpriseSitesAllowed: 1,
        mEnterpriseCustomEmployees: 0,
        mEnterpriseCustomDomains: 'Yes',
        mEnterprisePrice: 200,
        
        yEnterpriseSitesAllowed: 1,
        yEnterpriseCustomEmployees: 0,
        yEnterpriseCustomDomains: 'Yes',
        yEnterprisePrice: 2400,
    },
}: SubscriptionPlanProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [subscriptionType, setSubscriptionType] = useState('monthly');
    
    
    const data = [
        {   id: 1, // this id is used send to stripe for payment processing check button at the end
            label: 'Startup',
            // tokens: planData.silverTokens,
            mcost: planData?.mStartupPrice,
            ycost: planData?.yStartupPrice,
            one: 'Create Sub-Domain',
            two: `Link Custom Domain : ${planData?.mStartupCustomDomains}`,
            three: `Link Custom Domain : ${planData?.yStartupCustomDomains}`,
            four: `Custom Logo + Web App Name`,
            five: `Fixed User Pricing`,
            six:  `10% Fee Cut per User Subscription`,
            seven: `Link your Stripe Payment Api Key`,
            eight: `Customer Support`,
            icon: CircleDollarSign,
            href: '/dashboard',
            color: 'text-sky-500',
        },
        {   id: 2,
            label: 'Mid-Size',
            // tokens: planData.goldTokens,
            mcost: planData?.mMidsizePrice,
            ycost: planData?.yMidsizePrice,
            one: 'Create Sub-Domain',
            two: `Link Custom Domain : ${planData?.mMidsizeCustomDomains}`,
            three: `Link Custom Domain : ${planData?.yMidsizeCustomDomains}`,
            four: `Custom Logo + Web App Name`,
            five: `Custom User Pricing`,
            six:  `10% Fee Cut per User Subscription`,
            seven: `Link your Stripe Payment Api Key`,
            eight: `Customer Support`,
            icon: Coins,
            href: '/dashboard',
            color: 'text-sky-500',
        },
        {   id: 3,
            label: 'Enterpise',
            // tokens: planData.platinumTokens,
            mcost: planData?.mEnterprisePrice,
            ycost: planData?.yEnterprisePrice,
            one: 'Create Sub-Domain',
            two: `Link Custom Domain : ${planData?.mEnterpriseCustomDomains}`,
            three: `Link Custom Domain : ${planData?.yEnterpriseCustomDomains}`,
            four: `Custom Logo + Web App Name`,
            five: `Custom User Pricing + Feature Access`,
            six:  `10% Fee Cut per User Subscription`,
            seven: `Link your Stripe Payment Api Key`,
            eight: `Priority Customer Support`,
            icon: Building2,
            href: '/dashboard',
            color: 'text-sky-500',
        },
    
    ]


    const onClick = async (ordertype: number) => {
        console.log('Contacting 0!')
        
        console.log('Contacting 1!')
    if(disabled)
    { console.log('Contacting! 2')
        router.push('/sign-up');   
    } else {
        console.log('Contacting!')
        let planSelected = {};
        if(ordertype === 1)
        {
            planSelected = {
                name:data[0].label, 
                price: subscriptionType === 'monthly' ? planData?.mStartupPrice : planData?.yStartupPrice,
                customDomain: subscriptionType === 'monthly' ? planData?.mStartupCustomDomains : planData?.yStartupCustomDomains,
                customExperts: subscriptionType === 'monthly' ? planData?.mStartupCustomEmployees : planData?.yStartupCustomEmployees,
                sitesAllowed:  subscriptionType === 'monthly' ? planData?.mStartupSitesAllowed : planData?.yStartupSitesAllowed,
            }
        } else if(ordertype === 2)
        {
            planSelected = {
                name:data[0].label, 
                price: subscriptionType === 'monthly' ? planData?.mMidsizePrice : planData?.yMidsizePrice,
                customDomain: subscriptionType === 'monthly' ? planData?.mMidsizeCustomDomains : planData?.yMidsizeCustomDomains,
                customExperts: subscriptionType === 'monthly' ? planData?.mMidsizeCustomEmployees : planData?.yMidsizeCustomEmployees,
                sitesAllowed:  subscriptionType === 'monthly' ? planData?.mMidsizeSitesAllowed : planData?.yMidsizeSitesAllowed,
            }
        }else if(ordertype === 3)
        {
            planSelected = {
                name:data[0].label, 
                price: subscriptionType === 'monthly' ? planData?.mEnterprisePrice : planData?.yEnterprisePrice,
                customDomain: subscriptionType === 'monthly' ? planData?.mEnterpriseCustomDomains : planData?.yEnterpriseCustomDomains,
                customExperts: subscriptionType === 'monthly' ? planData?.mEnterpriseCustomEmployees : planData?.yEnterpriseCustomEmployees,
                sitesAllowed:  subscriptionType === 'monthly' ? planData?.mEnterpriseSitesAllowed : planData?.yEnterpriseSitesAllowed,
            }
        }
            try {      
                setLoading(true);
                console.log('Contacting API!')
                const response = await axios.post("/api/stripeWhitelabel",{planSelected:planSelected}); //get request replaced

                window.location.href = response.data.url;
                
            } catch (error) {
                console.log("BILLING_ERROR", error)
                toast.error("Something went wrong");
            } finally {
                setLoading(false);
            }
        
    }
        
};
        
const handleToggle = () => {
    setSubscriptionType((prevType) => (prevType === 'monthly' ? 'yearly' : 'monthly'));
  };
  
    return (
            <div  className="flex flex-col items-center">
        

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-4">
            {
                data.map((item) => (
                    <Card
                    key={item.id}
                    className="bg-slate-200 rounded-xl text-gray-600 cursor-pointer m-2 hover:m-2 hover:bg-black hover:text-white transition"
                    >
                            <CardHeader className="flex items-center mb-10 text-center ">

                                <item.icon className="w-14 h-14" />

                                <p className="text-xl font-bold">
                                    {item.label}
                                </p>
                                {/* <p className="text-lg">
                                    {item.tokens} Tokens
                                </p> */}

                                <p className="text-md font-bold">
                                {subscriptionType === 'monthly' ? item.mcost + ' USD' : item.ycost + ' USD'}
                                </p>


                <span className={`text-xl  ${subscriptionType === 'monthly' ? 'text-purple-600 font-semibold' : 'text-purple-700 font-bold'}`}>
                    {subscriptionType === 'monthly' ? 'Monthly' : 'Yearly'}
                 </span>

      

      <button
            className={`relative w-16 h-8 bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out ${
              subscriptionType === 'monthly' ? 'bg-purple-300 ' : 'bg-purple-400'
            }`}
        onClick={handleToggle}
      >
        <div
          className={`absolute left-0   w-7 h-7 bg-white  rounded-full shadow-md transform transition-transform -translate-y-2/4 ${
            subscriptionType === 'monthly' ? 'translate-x-1' : 'translate-x-8'
          }`}
        />
      </button>

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
                                {subscriptionType === 'monthly' ? (item.two)  : item.three } 
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

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.six}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.seven}
                                </p>
                            </div>

                            <div className="flex">
                                 <Check className={"h-5 w-5 mr-3 text-emerald-600"} />
                                <p className="text-md">
                                    {item.eight}
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

      
  </div>
    )

}
/*
        <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
*/