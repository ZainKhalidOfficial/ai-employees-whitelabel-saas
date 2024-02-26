'use server'

import { FreeCounterDisplay } from "./free-counter-display"
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


export const FreeCounter = async () => {

    const [isPro, apiLimitCount] = await Promise.all([  
    checkSubscription(), 
    getApiLimitCount()
  ]);

   return(
    <FreeCounterDisplay isPro={isPro}  apiLimitCount={apiLimitCount}/>
   )

}