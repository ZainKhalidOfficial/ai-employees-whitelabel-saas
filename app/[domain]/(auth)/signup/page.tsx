"use client";

import { useState } from "react";
import * as z from "zod";
import React from "react";
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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
  username: z.string().min(1, {
    message: "Name is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  })
})



export default function SignupForm() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  // const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      //Create Expert Functionality

      const { data } = await axios.post("/api/authusers/signup", values);
      toast.success("Signup Successful. Please verify your email address.");

      setIsLoading(false);
      router.refresh();
      router.push("/login");
    }
    catch (e) {
      setIsLoading(false);
      const error = e as AxiosError;
      toast.error(`Sign up Failed! ${error.response?.statusText}`);
    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="p-10 rounded-xl bg-slate-100">
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">

            <div className="space-y-1 w-full text-center">

              <h3 className="text-lg font-medium text-black">
                Signup
              </h3>

              <p className="text-sm text-muted-foreground text-gray-400">
                Entering your username, password and valid email to register.
              </p>

              <Separator className="bg-stone-300" />
            </div>


            <div className="grid grid-cols-1 gap-2">

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
                        placeholder={"Enter Email"}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2 md:col-span-1 text-black">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white"
                        disabled={isLoading}
                        placeholder={"Enter Name"}
                        {...field}
                      />
                    </FormControl>

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
                        className="text-white"
                        disabled={isLoading}
                        placeholder={"Enter Password"}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />

                  </FormItem>
                )}
              />


            </div>


            <div className="w-full flex justify-center">
              <Button size="lg" className="text-white bg-black hover:text-black hover:border" disabled={isLoading}>
                Signup
              </Button>
            </div>

            {isLoading ?

              <div className="w-full flex justify-center">
                <LoaderIcon className="animate-spin text-black" />
              </div>
              : <div className="w-full flex justify-center">

              </div>
            }

            <p className="text-sm  text-gray-400 text-center">
              By Signing up you agree to our <Link href={"/privacy-policy"} className="text-blue-400">Privacy Policy</Link> and <Link href={"/privacy-policy"} className="text-blue-400">Terms & Conditions</Link>.
            </p>

            <div className="w-full flex justify-center text-black hover:text-blue-400">
              <Link href={"/login"}>
                Go to Login
              </Link>
            </div>





          </form>
        </Form>


      </div>

    </div>
  )
}
