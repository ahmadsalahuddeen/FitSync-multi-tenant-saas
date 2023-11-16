"use client";
import Container from "@/components/ui/container";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "@/lib/axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"



import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { set, useForm } from "react-hook-form";
import { signInSchema } from "@/validators/auth";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Icons } from "@/components/icons";
type Props = {};
const SignIn = (props: Props) => {
  const router = useRouter();
  const [FormStep, setFormStep] = useState(0);
  const [error, setError] = useState<string | null >(null);

  type Input = z.infer<typeof signInSchema>;

  // react hook form
  const form = useForm<Input>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watcher = form.watch();

  async function onSubmit(input: Input) {
    try {
      const response = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });
      if(response && !response.error){
        router.push("/dashboard");

      }else{
        console.log("Error:", response)
setError("Your email or passowrd is wrong!")
      }
   
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8",
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6  text-green-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <Card className="border-none border-0 ">
            <CardContent>
          {error && (
              <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-3 w-3" />
              <AlertDescription className="text-xs">{error}</AlertDescription>
              
            </Alert>
          )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" relative space-y-3     "
                >
                  <div className={cn("space-y-3")}>
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Email Address</FormLabel> */}
                          <FormControl>
                            <Input placeholder="youname@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Passoword */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Create Password</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="enter your password"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                          <p className=" text-start text-xs text-muted-foreground">
              <Link
                href="/auth/signup"
                className="hover:text-brand underline underline-offset-4"
              >
                Forgot password? 
              </Link>
            </p>

                    <div className="flex gap-4">
                      <Button className="flex-1	" type="submit">
                        Sign In
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="grid gap-4 mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline">
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </div>
            </CardContent>
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/signup"
                className="hover:text-brand underline underline-offset-4"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignIn;
