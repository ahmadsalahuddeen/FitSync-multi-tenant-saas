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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { z } from "zod";
import { Icons } from "@/components/icons";
import { cn, countries } from "@/lib/utils";
import { ArrowRight, Ghost } from "lucide-react";
import { Toaster, toast } from "sonner";
import { easeInOut, motion, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/use-request";
import Link from "next/link";
import { signIn } from "next-auth/react";

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  type Input = z.infer<typeof registerSchema>;

  // schema to ts types

  // react hook form
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const {
    mutate: doRequest,

    isError,

    error,
  } = useMutation({
    mutationFn: async (input: Input) => {

      const response = await axios.post("/api/auth/tenant/signup", {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,

        confirmPassword: input.confirmPassword,
      });
      return response.data;

    },

    onError: (error: any) => {
      error.response.data.errors.map((err: any) => {
        toast.error(err.message);
      });
    },
    onSuccess: async (data, variables) => {
      await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      });

      router.push("/dashboard");
      router.refresh();
    },
  });
  async function onSubmit(input: Input) {
    if (input.confirmPassword !== input.password) {
      return toast.error("Confirm password does not match!");
    }
    await doRequest(input);
  }

  return (
    <>
      <div className="container flex h-auto w-screen flex-col items-center justify-center">
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
        <div className="mx-auto my-[5rem] flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6  text-green-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Let's get started
            </h1>
            <p className="text-sm text-muted-foreground">
              Just a few more details to get started📈
            </p>
          </div>

          <Card className="border-none">
            <CardHeader></CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" relative space-y-3  "
                >
                  {/* First Form Step  */}
                  <div className={cn("space-y-3")}>
                    {/* First and Last Name */}
                    <div className="gap-4 md:flex">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="you@yourdomain.com"
                              {...field}
                            />
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
                          <FormLabel>Create Password</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* confirm password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      disabled={isLoading}
                      className="flex-1	"
                      type="submit"
                    >
                      {isLoading ? "submitting.." : "Create account"}
                      {isLoading ? (
                        <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.arrowRight className="ml-2 h-4 w-4 " />
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mt-6 grid gap-4">
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
                  <Button
                    variant="outline"
                    disabled={isGitHubLoading}
                    onClick={() => {
                      setIsGitHubLoading(true);
                      signIn("github");
                    }}
                  >
                    {isGitHubLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}{" "}
                    Github
                  </Button>

                  <Button
                    variant="outline"
                    disabled={isGoogleLoading}
                    onClick={() => {
                      setIsGoogleLoading(true);
                      signIn("google");
                    }}
                  >
                    {isGoogleLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                  </Button>
                </div>
              </div>
            </CardContent>

            <p className="px-8 pb-6 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/signin"
                className="hover:text-brand underline underline-offset-4"
              >
                Already have an account? Sign In
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
