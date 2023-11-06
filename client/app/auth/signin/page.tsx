"use client";
import Container from "@/components/ui/container";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();
  const [FormStep, setFormStep] = useState(0);

  type Input = z.infer<typeof registerSchema>;

  const { doRequest } = useRequest({
    url: "/api/users/tenant/signup",
    method: "post",
  });

  // schema to ts types

  // react hook form
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      activeCustomers: "",
      businessName: "",
      confirmPassword: "",
      country: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      refer: "",
    },
  });

  const watcher = form.watch();

  // const {
  //   mutate: asdf,
  //   isLoading,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: async ({
  //     firstName,
  //     lastName,
  //     businessName,
  //     activeCustomers,
  //     password,
  //     confirmPassword,
  //     country,
  //     email,
  //     phoneNumber,
  //     refer,
  //   }: Input) => {
  //     // try {

  //     const response = await axios.post(`/api/users/tenant/signup`, {
  //       firstName,
  //       lastName,
  //       businessName,
  //       activeCustomers,
  //       password,
  //       confirmPassword,
  //       country,
  //       email,
  //       phoneNumber,
  //       refer,
  //     });

  //     console.log(response.data);

  //     // } catch (err) {
  //     //   console.log(err.response.data)
  //     // }
  //   },
  // });

  function onSubmit(input: Input) {
    try {
      doRequest(
        {
          firstName: input.firstName,
          lastName: input.lastName,
          businessName: input.businessName,
          activeCustomers: input.activeCustomers,
          password: input.password,
          confirmPassword: input.confirmPassword,
          country: input.country,
          email: input.email,
          phoneNumber: input.phoneNumber,
          refer: input.refer,
        },
        {
          onSuccess: () => router.push("/dashboard"),
        },
      );
      // asdf(
      //   {
      //     firstName: input.firstName,
      //     lastName: input.lastName,
      //     businessName: input.businessName,
      //     activeCustomers: input.activeCustomers,
      //     password: input.password,
      //     confirmPassword: input.confirmPassword,
      //     country: input.country,
      //     email: input.email,
      //     phoneNumber: input.phoneNumber,
      //     refer: input.refer,
      //   },
      //   {
      //     onSuccess: (response) => {
      //       router.push('/dashboard')
      //     },
      //     onError: (error: any) => {
      //       error.response.data.errors.map((err: any) => {
      //         toast.error(err.message);
      //       });
      //     },
      //   },
      // );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Card className="w-[350px] md:w-[470px]">
          <CardHeader>
            <CardTitle>
            Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground ">
             
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" relative space-y-3   overflow-x-hidden  "
              >
                {/* First Form Step  */}
                <div
                  className={cn(
                    "space-y-3",
                    //  { hidden: FormStep === 1 }
                  )}
                >
                  {/* First and Last Name */}

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@yourdomain.com" {...field} />
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

                  <div className="flex gap-4">
                    <Button type="submit">Sign In</Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
