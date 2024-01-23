"use client"

import * as z from "zod";
import { BusinessProfile } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Delete, Wand2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const profileNameExample= "Sunshine Pet Care";
const profileDataExample = "Sunshine Pet Care, serving Sunnyville and nearby areas, specializes in comprehensive pet sitting and dog walking services with a focus on legal compliance and top-tier care. Our professional team offers in-home pet care, including companionship, feeding, and medication administration, adhering to strict schedules and protocols. Our experienced dog walkers promote physical and mental well-being while ensuring leash control and compliance with local laws. Overnight pet care provides continuous supervision in a familiar setting, and our reliable pet transportation services meet all legal requirements. Quick check-ins for busy pet owners ensure your pets' comfort. With a dedicated, trained team, legal compliance, insurance, and personalized care, Sunshine Pet Care is your trusted choice for premium pet services.";
interface BusinessProfilesFormProps {
    initialData: BusinessProfile | null;
}

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required.",
    } ),
    profileData: z.string().min(200,{
        message: "Profile data require atleast 200 characters.",
    } )
})

export const BusinessProfilesForm = ({
    initialData
}: BusinessProfilesFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            profileData:"",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            if(initialData) {
                //Update Expert Functionality
                await axios.patch(`/api/businessProfiles/${initialData.id}`, values);
            } else {
                //Create Expert Functionality
                await axios.post("/api/businessProfiles", values);
            }

            toast({
                description : "Success."
            });

            router.refresh();
            router.push("/businessProfilesPage");
        }
        catch (error) {
            toast({
                variant : "destructive",
                description : "Something went wrong",
            });
        }
    }

    let disabled = false;

    const onDelete = async () => {
        try {
            disabled = true;

            if(initialData) {

                await axios.delete(`/api/businessProfiles/${initialData.id}`);
            }

            toast({
                description : "Profile deleted successfuly"
            });
            
            router.refresh();
            router.push("/businessProfilesPage");
        }
        catch (error) {

            toast({
                variant : "destructive",
                description : "Something went wrong",
            });
        }
    }

    return (
        <div className="p-4 space-y-2 w-full ">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full pb-10">
                    <div className="space-y-2 w-full ">
                    <div>
                        <h3 className="text-lg font-medium">
                            Business Profile
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Your complete business profiles information
                        </p>
                    </div>

                    <Separator className="bg-primary/10" />
                    </div>


                    <div className="grid grid-cols-1 gap-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder={profileNameExample}
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your business will be named.
                                    </FormDescription>
                                    <FormMessage />

                                  </FormItem>  
                                )}
                            />

                            <FormField
                                name="profileData"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Profile Details</FormLabel>
                                    <FormControl>

                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={6}
                                    disabled={isLoading}
                                    placeholder={profileDataExample}
                                    {...field}
                                    />

                                    </FormControl>
                                    <FormDescription>
                                        Your business data that the experts will know about.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>  
                                )}
                            />
                    </div>



      
                            <div className="w-full flex justify-center">
                                <Button size="lg" disabled={isLoading}>
                                    {initialData ? "Edit your expert" : "Create your expert"}
                                    <Wand2 className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
             
                </form>     
            </Form>

            {initialData &&

            <div className="w-full flex justify-center">
                  <Button onClick={onDelete} disabled={isLoading} variant="destructive" size="lg" >
                  Delete
                 <Delete className="w-4 h-4 ml-2" />
           </Button>
        </div>

            }

        
        </div>
    )
}