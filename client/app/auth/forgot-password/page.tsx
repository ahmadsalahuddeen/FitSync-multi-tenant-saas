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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { set, useForm } from "react-hook-form";
import { emailZod, otpZod } from "@/validators/auth";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useMutation, useQuery } from "react-query";
type Props = {};
const ForgotPassword = (props: Props) => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // zod types
  type EmailInput = z.infer<typeof emailZod>;
  // type PasswordInput = z.infer<typeof passwordZod>;

  // react hook form
  const emailForm = useForm<EmailInput>({
    resolver: zodResolver(emailZod),
    defaultValues: {
      email: "",
    },
  });

  // const passwordForm = useForm<PasswordInput>({
  //   resolver: zodResolver(passwordZod),
  //   defaultValues: {
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  const {
    
    mutate: requestOtp,
    isLoading,

    isError,
  } = useMutation({
    
    mutationFn: async (input: EmailInput) => {
        const otp = await axios.post("/api/auth/forgot-password", {
          email: input.email,
        });
    
    },
    onSuccess: ()=>{

      const url =  `/auth/verify-otp?email=${userEmail}`
router.push(url)
    },

    onError: (err: any) => {
      setError(err.response.data)
        toast.error(err.response.data);
    },
  });



  async function onEmailSubmit(input: EmailInput) {
    try {
      await setUserEmail(input.email)

      await requestOtp(input)
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
            {/* <Icons.logo className="mx-auto h-6 w-6  text-green-600" /> */}
            <h1 className="text-2xl  font-semibold tracking-tight">
              Forgot your Password ? 👀
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your user account's email address and we will send you an
              OTP .
            </p>
          </div>
          <Card className="border-0 border-none ">
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <ExclamationTriangleIcon className="h-3 w-3" />
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className=" relative space-y-3     "
                >
                  <div className={cn("space-y-3")}>
                    {/* Email */}
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Email Address</FormLabel> */}
                          <FormControl>
                            <Input placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">

                      <Button
                      disabled={isLoading}
                      className="flex-1	" type="submit">
                        {isLoading ? 'Sending':'Send OTP'}
                        {isLoading ? (
                      <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />

                        ):(
                          <Icons.arrowRight className="ml-2 h-4 w-4 " />

                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/signin"
                className="hover:text-brand underline underline-offset-4"
              >
                Remember password? Sign In
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
