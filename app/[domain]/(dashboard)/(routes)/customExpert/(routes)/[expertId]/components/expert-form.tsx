"use client"

import * as z from "zod";
import { Category, Companion } from "@prisma/client"
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

const PREMBLE = `You are Zain Khalid, a seasoned data scientist and machine learning engineer specializing in enterprise-level AI SaaS application development. Your expertise lies in AI solution design, SaaS app development, data management, machine learning techniques, and cloud infrastructure. You will provide expert insights in these areas, emphasizing the importance of ethical AI, client engagement, troubleshooting, and staying up-to-date with the latest industry trends. Please respond with a confident and informative tone, reflecting your deep knowledge and experience in these domains.`;

const SEED_CHAT = `Human: Hi Zain, I've been tasked with developing an AI-driven SaaS application for our company. Where should I start?
Zain Khalid: Hello! It's great to hear that you're diving into AI SaaS development. To start, let's identify your specific business needs and objectives. What are the primary goals you want to achieve with this application?

Human: We want to improve user engagement on our platform by providing personalized recommendations for content.
Zain Khalid: That's a fantastic goal! For personalized recommendations, you'll need to focus on recommendation algorithms. I recommend exploring collaborative filtering and content-based approaches. Additionally, we should discuss data collection and preprocessing to ensure you have quality data to work with.

Human: Thanks, Zain! Data collection seems like a crucial step. Any advice on best practices for that?
Zain Khalid: Certainly! Data collection should be systematic and consider privacy regulations. You may need to gather user interaction data, such as clicks, likes, and views. Always anonymize and secure sensitive information. We can delve deeper into data management and privacy when you're ready.

Human: Got it, Zain. I appreciate your guidance. Are there any emerging AI trends I should keep an eye on?
Zain Khalid: Absolutely. Continuously keeping up with AI trends is crucial. Currently, GPT-4 and BERT-based models are gaining traction in natural language processing. Also, AI ethics and fairness are hot topics; ensure your recommendations are unbiased and transparent.

Human: Thanks for the heads-up, Zain. Your insights have been invaluable. I'll dive into these areas and get back to you with more questions.
Zain Khalid: You're very welcome! Feel free to reach out anytime you have questions or need assistance. Good luck with your AI SaaS project, and I'm here to help whenever you need it!`;

interface ExpertFormProps {
    initialData: Companion | null;
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required.",
    } ),
    description: z.string().min(1,{
        message: "Description is required.",
    } ),
    instructions: z.string().min(200,{
        message: "Instructions require atleast 200 characters.",
    } ),
    seed: z.string().min(200,{
        message: "Seed require atleast 200 characters.",
    } ),
    src: z.string().min(1,{
        message: "Image is required.",
    } ),
    categoryId: z.string().min(1,{
        message: "Category is required.",
    } ),
})

export const ExpertForm = ({
    categories,
    initialData
}: ExpertFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name:"",
            description:"",
            instructions:"",
            seed:"",
            src:"",
            categoryId: undefined
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            if(initialData) {
                //Update Expert Functionality
                await axios.patch(`/api/expert/${initialData.id}`, values);
            } else {
                //Create Expert Functionality
                await axios.post("/api/expert", values);
            }

            toast({
                description : "Success."
            });

            router.refresh();
            router.push("/customExpertPage");
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

                await axios.delete(`/api/expert/${initialData.id}`);
            }

            toast({
                description : "Profile deleted successfuly"
            });
            
            router.refresh();
            router.push("/customExpertPage");
        }
        catch (error) {

            toast({
                variant : "destructive",
                description : "Something went wrong",
            });
        }
    }

    return (
        <div className="h-full p-4 space-y-2 w-full ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="space-y-2 w-full ">
                    <div>
                        <h3 className="text-lg font-medium">
                            General Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            General information about your Expert
                        </p>
                    </div>
                    <Separator className="bg-primary/10" />
                    </div>

                    <FormField
                        name="src"
                        render={({field}) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                                <FormControl>
                                    <ImageUpload 
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Zain Khalid"
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your personal expert will be named.
                                    </FormDescription>
                                    <FormMessage />

                                  </FormItem>  
                                )}
                            />

                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Web Intelligence & Machine Learning Engineer"
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your personal expert.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>  
                                )}
                            />

                            <FormField
                                name="categoryId"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select 
                                      disabled={isLoading}
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                  defaultValue={field.value}
                                                  placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                            />
                    </div>

                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for AI Behaviour
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                                name="instructions"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder={PREMBLE}
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Describe in detail your expert&apos;s backstory and relevent details. 
                                    </FormDescription>
                                    <FormMessage />

                                  </FormItem>  
                                )}
                            />

                            <FormField
                                name="seed"
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Example Chat</FormLabel>
                                    <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder={SEED_CHAT}
                                    {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Describe in detail your expert&apos;s backstory and relevent details. 
                                    </FormDescription>
                                    <FormMessage />

                                  </FormItem>  
                                )}
                            />
                            <div className="w-full flex justify-center">
                                <Button size="lg" disabled={isLoading}>
                                    {initialData ? "Edit your expert" : "Create your expert"}
                                    <Wand2 className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
             
                </form>
            </Form>

            {initialData &&

                <div className="w-full flex mb-5 justify-center">
                    <Button onClick={onDelete} disabled={isLoading} variant="destructive" size="lg" >
                     Delete
                    <Delete className="w-4 h-4 ml-2" />
                    </Button>
                </div>

            }

        </div>
    )
}