

import { CreateCustomEmployeeButton } from "@/components/create-customEmployee-Button";
import { CustomExpertsListPage } from "@/components/customExperts";


const customExpertsPage = async () => {



  return (
    <div>
      <div className='mb-8 space-y-4'>
      <h2 className='text-2xl md:text-4xl font-bold text-center'>
      Custom Experts
      </h2>

      <p className='text-muted-foreground font-light text-sm md:text-lg text-center '>
        Create your personalized AI Employees with the power of Prompt Engineering
      </p>
      </div>

      <div className="w-full mx-auto m-10 text-center items-center justify-center">
                               
      <CreateCustomEmployeeButton />

      </div>

      <CustomExpertsListPage />

    </div>
    
  )
}

export default customExpertsPage;


/*
      <div className='px-4 md:px-20 lg:px-32 space-y-4'>
        {data.map((item) => (
          <Card 
          key={item.id}
          className=" border-black/5  bg-primary/5 hover:shadow-md transition cursor-pointer"
          >
            <Link href={`/businessProfiles/${item.id}`} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md bg-emerald-500/20 text-emerald-700" )}>
              <Building className={cn("w-8 h-8" )} />
              </div>
              <div className="font-semibold" >
                {item.name}
              </div>

            </div>
             <div className="flex gap-x-5"> 
              <p>Go to Edit / Delete</p>
              <ArrowRight className="w-5 h-5" />
              </div>

            </Link>
          </Card>
        ))}
      </div>
*/