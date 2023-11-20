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
import { emailZod, otpZod, passwordZod } from "@/validators/auth";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useMutation, useQuery } from "react-query";

type Props = {};

const ForgotPassword = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email");
  const userOtp = searchParams.get('otp')

  const [error, setError] = useState<string | null>(null);

  // zod types
  type PasswordInput = z.infer<typeof passwordZod>;

  // react hook form
  const passwordForm = useForm<PasswordInput>({
    resolver: zodResolver(passwordZod),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // query fn to handle reset password api
  const {
    mutate: resetPassword,
    isLoading,

    isError,
  } = useMutation({
    mutationFn: async (input: PasswordInput) => {
       await axios.post("/api/auth/reset-password", {
        email: input.password,
        newPassword: input.password,
        otp: userOtp
      });
    },
    onSuccess: () => {
  
      router.push('/dashboard');
      router.refresh()
    },

    onError: (err: any) => {
      setError(err.response.data);
      toast.error(err.response.data);
    },
  });


  // handle password form submit
  async function onPasswordSubmit(input: PasswordInput) {
    try {
     
      if (input.password !== input.confirmPassword) {
        setError("confirm Password do not match");
        toast.error("Password do not match");
        return;
      }
      await resetPassword(input);
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
              Reset your password 🙈
            </h1>
            <p className="text-sm text-muted-foreground"></p>
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

              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className=" relative space-y-3     "
                >
                  <div className={cn("space-y-3")}>
                    {/* Passoword */}
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>new password</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* confirm password */}
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>confirm new password</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} type="password" />
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
                        {isLoading ? "changing..." : "Change Password"}
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
