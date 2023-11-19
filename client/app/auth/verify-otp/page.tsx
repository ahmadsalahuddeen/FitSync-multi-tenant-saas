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
import { Card, CardContent } from "@/components/ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { otpZod } from "@/validators/auth";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useMutation, useQuery } from "react-query";
type Props = {};
const verifyOtp = (props: Props) => {
  // email passed from previos page
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  console.log('oooooooooooooooooooooooo', userEmail)
  // zod types
  type OtpInput = z.infer<typeof otpZod>;

  // react hook form
  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpZod),
    defaultValues: {
      otp: "",
    },
  });

  const {
    mutate: requestOtp,
    isLoading,

    isError,
  } = useMutation({
    mutationFn: async (input: OtpInput) => {
      const otp = await axios.post("/api/auth/forgot-password", {
        otp: input.otp,
      });
    },
    onSuccess: () => {
      router.push(`auth/verify-otp?email="sadfsdf"`);
    },

    onError: (err: any) => {
      setError(err.response.data);
      toast.error(err.response.data);
    },
  });

  async function onEmailSubmit(input: any) {
    try {
      await requestOtp(input);
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

              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onEmailSubmit)}
                  className=" relative space-y-3     "
                >
                  <div className={cn("space-y-3")}>
                    {/* Email */}
                    <FormField
                      control={otpForm.control}
                      name="otp"
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
                        className="flex-1	"
                        type="submit"
                      >
                        {isLoading ? "Sending an OTP" : "Send OTP"}
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

export default verifyOtp;
