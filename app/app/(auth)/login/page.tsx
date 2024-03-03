"use client";

// import LoginButton from "./login-button";
import * as z from "zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";


const formSchema = z.object({
    email: z.string().min(5, {
        message: "Email is required.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
})

export default function LoginForm() {

    const router = useRouter();
    // const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    //   const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            //Create Expert Functionality


            // const {data} =  await axios.post("/api/authuser/login", values);
            await axios.post("/api/authtenant/login", values);

            // alert(JSON.stringify(data));
            // console.log("msg: ",JSON.stringify(data))

            router.refresh();
            router.push("/");
        }
        catch (e) {
            setIsLoading(false);
            // toast({
            //     variant: "destructive",
            //     description: "Login Failed",
            // });

            const error = e as AxiosError;
            toast.error(`Login Failed! ${error.response?.statusText}`);


            // alert(error.message);
        }
    }

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


                            <Separator className="bg-stone-300" />
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
                                                className="text-black"
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
                                                className=" text-black"
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

                        {isLoading ?

                            <div className="w-full flex justify-center gap-2">
                                <LoaderIcon className="animate-spin text-black" />
                            </div>
                            : <div className="w-full flex justify-center gap-2">

                            </div>
                        }


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
