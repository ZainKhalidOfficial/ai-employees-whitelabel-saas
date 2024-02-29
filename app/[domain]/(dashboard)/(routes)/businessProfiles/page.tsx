
import { CreateBusinessProfileButton } from "@/components/create-BusinessProfile-Button";
import { BusinessProfileListPage } from "@/components/businessProfiles";
import { Suspense } from "react";


 const BusinessProfilesPage = async () => {

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

      <Suspense>
      <BusinessProfileListPage />
      </Suspense>
    </div>
    
  )
}

export default BusinessProfilesPage;
