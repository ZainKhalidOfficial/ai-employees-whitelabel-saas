'use client'


import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";


interface FreeCounterDisplayProps {
    apiLimitCount: {
        tokensUsed:number;
        businessProfilesUsed:number;
        customEmployeesUsed:number;
    };
    isPro: {
        isPro: boolean;
        tokensAllowed: number;
        businessProfilesAllowed:number;
        customEmployeesAllowed:number;
};
}

export const FreeCounterDisplay = ({
    apiLimitCount =  {tokensUsed:0, businessProfilesUsed:0 ,customEmployeesUsed:0},
    isPro = {isPro:false, tokensAllowed: 0, businessProfilesAllowed:0, customEmployeesAllowed:0},
}: FreeCounterDisplayProps) => {

    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return null;
    }

    const onClick = () => {
        router.push("/settings");
    }

    if (isPro.isPro) { //for pro users 
        return(
            <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6 ">
                    <div className="text-center text-sm text-white mb-4 space-y-2">

                        <p>
                            {apiLimitCount.tokensUsed} / {isPro.tokensAllowed} Tokens Used
                        </p>
                        <Progress 
                        className="h-3"
                        value={(apiLimitCount.tokensUsed / isPro.tokensAllowed) * 100}
                        />
                        <p className="text-purple-500 font-semibold">
                             PRO
                        </p>
                    </div>
                    
                </CardContent>
            </Card>
        </div>
         );
    }

    return(   //for free trial
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6 ">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount.tokensUsed} / {MAX_FREE_COUNT} Free Tokens Used 
                        </p>
                        <Progress 
                        className="h-3"
                        value={(apiLimitCount.tokensUsed / MAX_FREE_COUNT) * 100}
                        />
                    </div>
                    <Button onClick={onClick} className="w-full" variant="premium">
                        Get Pro Version <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}