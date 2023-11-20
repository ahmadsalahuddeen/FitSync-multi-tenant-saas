"use client";
import Container from "@/components/ui/container";
import React, { useEffect, useState } from "react";
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
  const userEmail = searchParams.get("email") as string;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // zod types
  type OtpInput = z.infer<typeof otpZod>;

  // react hook form
  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpZod),
    defaultValues: {
      otp: "",
    },
  });

  //use effect for resend otp interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);




// query mutation fn to resend otp
const {
    
  mutate: resendOtp,
isLoading: newOtpLoading


} = useMutation({
  
  mutationFn: async (email: string) => {
      const otp = await axios.post("/api/auth/forgot-password", {
        email,
      });
  
  },
  onSuccess: ()=>{
setSeconds(30)
    toast.success('A new OTP is on your way!')
  },

  onError: (err: any) => {
    setError(err.response.data)
      toast.error(err.response.data);
  },
});






  // query function to verify otp
  const {
    mutate: verifyOtp,
    isLoading,

    isError,
  } = useMutation({
    mutationFn: async (input: OtpInput) => {
      const { data } = await axios.post("/api/auth/verify-otp", {
        otp: input.otp,
        email: userEmail,
      });
      return data;
    },
    onSuccess: (data) => {
      router.push(`/auth/reset-password?email=${userEmail}&otp=${data.validOtp}`);
    },

    onError: (err: any) => {
      setError(err.response.data);
      toast.error(err.response.data);
    },
  });

  async function onOtpSubmit(input: any) {
    try {
      await verifyOtp(input);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleResendOtp() {
await resendOtp(userEmail)

  }
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/auth/forgot-password"
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
              Verify OTP !✅
            </h1>
            <p className="text-sm text-muted-foreground">
              Kindly enter the 4-digit OTP sent to <br /> <b>{userEmail}</b>.
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
                  onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                  className=" relative space-y-3     "
                >
                  <div className={cn("space-y-3")}>
                    {/* OTP */}
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter Four digit OTP"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">

                    <Button
                      disabled={isLoading}
                      className="flex-1	" type="submit">
                        {isLoading ? 'Verifying':'Verify '}
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
            <p className="px-8 text-center text-xs  text-muted-foreground">
              Didn't recieve the email? <br />
              <Button
                variant="link"
                disabled={seconds > 0 || minutes > 0 || newOtpLoading}
                onClick={() => {handleResendOtp()}}
                className="hover:text-brand  m-0 px-2 underline  underline-offset-4"
              >
                 {newOtpLoading ? 'Resending OTP':'Resend OTP '}
                        {newOtpLoading && <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />}
                
              </Button>
              in <b> {seconds}</b> seconds
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default verifyOtp;
