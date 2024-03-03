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

      <Suspense fallback={
        <div className="flex justify-center items-center gap-2 h-screen">
          <div className="rounded-md h-12 w-12 md: border-4 border-t-4 border-white animate-spin absolute"></div>
        </div>
      }>
        <BusinessProfileListPage />
      </Suspense>
    </div>

  )
}

export default BusinessProfilesPage;
