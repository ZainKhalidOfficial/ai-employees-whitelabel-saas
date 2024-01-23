"use client";

import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";

import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const formSchema = z.object({
  email: z.string().min(5,{
      message: "Email is required.",
  } ),
  password: z.string().min(1,{
    message: "Password is required.",
} ),
})

export default function LoginForm () {

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          email:"",
          password:"",
      },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {

              //Create Expert Functionality

              
            // const {data} =  await axios.post("/api/authuser/login", values);
            const {data} =  await axios.post("/api/authuser/login", values);
          // toast({
          //     description : "Success."
          // });

          // alert(JSON.stringify(data));

          router.refresh();
          router.push("/");
      }
      catch (e) {
          toast({
              variant : "destructive",
              description : "Login Failed",
          });

          const error = e as AxiosError;

          // alert(error.message);
      }
  }

  let disabled = false;


  
  return (
      <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
        
        <div className="p-10 rounded-xl bg-slate-100">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full pb-10">
                  <div className="space-y-2 w-full  text-center">
                  
                      <h3 className="text-lg text-black font-medium">
                          Login
                      </h3>
                      <p className="text-sm text-gray-500">
                          Enter you valid email address & password to login.
                      </p>
                 

                  <Separator className="bg-primary/10" />
                  </div>


                  <div className="grid grid-cols-1 gap-4">
                          <FormField
                              name="email"
                              control={form.control}
                              render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1 text-black">
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                  <Input
                                  className="text-white"
                                  disabled={isLoading}
                                  placeholder={"Enter your email address"}
                                  {...field}
                                  />
                                  </FormControl>
                                  <FormDescription>
                                      {/* Enter email with which you signed up. */}
                                  </FormDescription>
                                  <FormMessage />

                                </FormItem>  
                              )}
                          />

                            <FormField
                              name="password"
                              control={form.control}
                              render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1 text-black">
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                  <Input
                                  className=" text-white"
                                  disabled={isLoading}
                                  placeholder={"Enter your Password"}
                                  {...field}
                                  />
                                  </FormControl>
                                  <FormDescription>
                                      {/* Enter your valid password. */}
                                  </FormDescription>
                                  <FormMessage />

                                </FormItem>  
                              )}
                          />
                         
                  </div>

    
                          <div className="w-full flex justify-center">
                              <Button size="lg" className="text-white bg-black hover:text-black hover:border" disabled={isLoading}>
                                  Login
                              </Button>
                          </div>

                          
                          <div className="w-full flex justify-center text-black hover:text-blue-400">
                              <Link href={"/signup"}>
                                  Go to Sign Up
                              </Link>
                          </div>
           
              </form>     
          </Form>

          </div>

      
      </div>
  )
}

// const formSchema = z.object({
//   name: z.string().min(1,{
//       message: "Name is required.",
//   } ),
//   password: z.string().min(1,{
//     message: "Password is required.",
// } ),
// })

// export default function LoginAccount() {

//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues:  {
//         name:"",
//         password:"",
//     },
// });

// const isLoading = form.formState.isSubmitting;

// const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   try {


//       //Create Expert Functionality
//       await axios.post("/api/businessProfiles", values);
    

//       toast({
//           description : "Success."
//       });

//       router.refresh();
//       router.push("/businessProfilesPage");
//   }
//   catch (error) {
//       toast({
//           variant : "destructive",
//           description : "Something went wrong",
//       });
//   }
// }

// let disabled = false;

//   return (
//       <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
//         <div className="w-full m-auto bg-white lg:max-w-lg">
//           <Form {...form} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full pb-10 w-full">

//             <div className="space-y-2 w-full">
//               <div>
//                 <h3 className="text-lg font-medium">Business Profile</h3>
//                 <p className="text-sm text-muted-foreground">Your complete business profiles information</p>
//                 {/* <Separator className="bg-primary/10" /> */}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <FormField
//                 name="name"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem className="col-span-2 md:col-span-1">
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input disabled={isLoading} placeholder={"saf"} {...field} />
//                     </FormControl>
//                     <FormDescription>This is how your business will be named.</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem className="col-span-2 md:col-span-1">
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input disabled={isLoading} placeholder={"saf"} {...field} />
//                     </FormControl>
//                     <FormDescription>This is how your business will be named.</FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />


//             </div>
//             <div className="w-full flex justify-center">
//               <Button size="lg" disabled={isLoading} >
//                 Create your expert
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
    
//   );
// }


//Original

{/* <div className="mx-5 border border-stone-200 py-10 dark:border-stone-700 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center font-cal text-3xl dark:text-white">
        Whitelabel Genius
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Own Genius as your personal web application with custom domains. <br />
        <a
          className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://vercel.com/blog/platforms-starter-kit"
          rel="noreferrer"
          target="_blank"
        >
          Read the announcement.
        </a>
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton />
        </Suspense>
      </div>
    </div> */}