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
  const [FormStep, setFormStep] = useState(0);

  type Input = z.infer<typeof registerSchema>;

  const { doRequest, isError, isLoading } = useRequest({
    url: "/api/auth/tenant/signup",
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

  
  
 async function onSubmit(input: Input) {
    try {
      doRequest({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        phoneNumber: input.phoneNumber,
        confirmPassword: input.confirmPassword,
        activeCustomers: input.activeCustomers,
        businessName: input.businessName,
        country: input.country,
        refer: input.refer,
      },
      {
        onSuccess: async()=> {
          const response = await signIn("credentials", {
            email: input.email,
            password: input.password,
            redirect: false,
          });
          const error = response?.error;
          if (error) {
            if (error == "Request failed with status code 400")
              toast.error("invalid email or password");
            console.log(error);
          }
          if (!response?.error) {
            router.push("/dashboard");
            router.refresh();
          }
          
        },
        onError: (error: any)=>{
          error.response.data.errors.map((err: any) => {
            toast.error(err.message);
          })
        }
      },
      
      
      
      );
      
    } catch (err) {
      console.log(err);
    }
  }
  const watcher = form.watch();

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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] my-40">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6  text-green-600" />
            <h1 className="text-2xl font-semibold tracking-tight">
            {FormStep === 0
                ? "Let's get started"
                : `Setup ${watcher.businessName} `}
            </h1>
            <p className="text-sm text-muted-foreground">
            {FormStep === 0
                ? "Explore your free 14-day trial🔥."
                : `Just a few more details to get started📈`}
            </p>
          </div>
          <Card className="">
          <CardHeader>
           
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" relative space-y-3   overflow-x-hidden  "
              >
                {/* First Form Step  */}
                <motion.div
                  className={cn(
                    "space-y-3",
                    //  { hidden: FormStep === 1 }
                  )}
                  animate={{
                    translateX: `-${FormStep * 100}%`,
                  }}
                  transition={{
                    ease: easeInOut,
                  }}
                >
                  {/* First and Last Name */}
                  <div className="gap-4 md:flex">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input  placeholder="John" {...field} />
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
                          <Input placeholder="you@yourdomain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
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
                </motion.div>

                {/* second Form Step  */}
                <motion.div
                  className={cn("absolute  left-0   right-0 top-0 space-y-3 ", {
                    // hidden: FormStep === 0
                  })}
                  style={{
                    translateX: `${100 - FormStep * 100}%`,
                  }}
                  animate={{
                    translateX: `${100 - FormStep * 100}%`,
                  }}
                  transition={{
                    ease: easeInOut,
                  }}
                >
                  {/* Business Name */}
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* active Cusomter */}
                  <FormField
                    control={form.control}
                    name="activeCustomers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How many customers do you have?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select " />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "none, launching Soon",
                              "0-100",
                              "101-300",
                              "301-600",
                              "600+",
                            ].map((noOfMember, i) => (
                              <SelectItem key={noOfMember} value={noOfMember}>
                                {noOfMember}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={"defaulCountry"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select " />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="h-40">
                            <SelectItem key={"country"} value="country">
                              country
                            </SelectItem>
                            {/* {countries.map((country, i) => (
                              <SelectItem
                                key={country.name + country.code}
                                value={country.name}
                              >
                                {country.name}
                              </SelectItem>
                            ))} */}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Refer */}
                  <FormField
                    control={form.control}
                    name="refer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where did you hear about us?</FormLabel>
                        <FormControl>
                          <Input placeholder="from twitter/X?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      //triggers validation before moving next form step
                      form.trigger([
                        "firstName",
                        "lastName",
                        "email",
                        "password",
                        "confirmPassword",
                        "phoneNumber",
                      ]);
                      const emailState = form.getFieldState("email");
                      const phoneState = form.getFieldState("phoneNumber");
                      const firstNameState = form.getFieldState("firstName");
                      const lastNameState = form.getFieldState("lastName");
                      const passwordState = form.getFieldState("password");
                      const confirmPassowordState =
                        form.getFieldState("confirmPassword");

                      // checks the validation result before redirecting step 2 of the form
                      if ( !emailState.isDirty || emailState.invalid) return;
                      if (!phoneState.isDirty || phoneState.invalid) return;
                      if (!firstNameState.isDirty || firstNameState.invalid)
                        return;
                      if (!lastNameState.isDirty || lastNameState.invalid)
                        return;
                      if (!passwordState.isDirty || passwordState.invalid)
                        return;
                      if (
                        !confirmPassowordState.isDirty ||
                        confirmPassowordState.invalid
                      )
                        return;
                      if (watcher.password !== watcher.confirmPassword) {
                        toast.error("Password do not match");
                        return;
                      }

                      setFormStep(1);
                    }}
                    className={cn({ hidden: FormStep === 1 })}
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    type="submit"
                    className={cn({ hidden: FormStep === 0 })}
                  >
                    Submit
                  </Button>

                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn({ hidden: FormStep === 0 })}
                    onClick={() => {
                      setFormStep(0);
                    }}
                  >
                    Go Back
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          {FormStep == 0 && (
            <p className="px-8 pb-6 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/signin"
                className="hover:text-brand underline underline-offset-4"
              >
                Already have an account? Sign In
              </Link>
            </p>

          )}
          </Card>

        </div>
      </div>













    </>
  );
};

export default SignUp;
