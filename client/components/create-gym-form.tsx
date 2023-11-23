import React, { useState } from "react";
import PhoneInputWithCountrySelect, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";

import 'react-phone-input-2/lib/bootstrap.css'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./icons";
import { isDirty, z } from "zod";
import { gymcreationSchema } from "@/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "./ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TelInput from "./phoneInput";

import { Select } from "./ui/select";
import { Input } from "./ui/input";
import PhoneInput from "react-phone-input-2";


type Props = {};

const GymCreateForm = (props: Props) => {
  type Input = z.infer<typeof gymcreationSchema>;
  const [validateError, setValidateError] = useState("");

  const {
    mutate: doRequest,

    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (input: Input) => {
      try {
        const response = await axios.post("/api/auth/tenant/signup", {
          name: input.name,
          phoneNumber: input.phoneNumber,
        });
      } catch (err: any) {
        err.response.data.errors.map((err: any) => {
          toast.error(err.message);
        });
      }
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(gymcreationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(input: Input) {
    try {
      console.log(input, "iiiiiiiiiiiiiiiiiiiii");
    } catch (err) {
      console.log(err);
    }
  }

  const watcher = form.watch();
  let validPhoneNumber = false;

  const validatePhoneNumber = (
    inputNumber: string,
    country: any,
    isDirty: boolean,
    phoneLength: number,
  ) => {
    if (isDirty) {
      if (
        inputNumber &&
        inputNumber?.replace(country.dialCode, "")?.trim() === ""
      ) {
        validPhoneNumber = false;
        return false;
      } else if (inputNumber.length < phoneLength) {
        validPhoneNumber = false;
        return false;
      }
      validPhoneNumber = true;
      return true;
    }
    validPhoneNumber = false;
    return false;
  };
  return (
    <Dialog>
      <Card className="border-0 shadow-none">
        <DialogHeader>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl ">Setup {watcher.name} </CardTitle>
            <CardDescription>
              Enter your gym details below to continue
            </CardDescription>
          </CardHeader>
        </DialogHeader>

        <CardContent className="grid gap-4">
          {isError && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-3 w-3" />
              <AlertDescription className="text-xs">
                {error as string}
              </AlertDescription>
            </Alert>
          )}
          {form.formState.errors["phoneNumber"] && (
            <Alert variant="destructive" className="mb-4">
              <ExclamationTriangleIcon className="h-3 w-3" />
              <AlertDescription className="text-xs">
                Invalid phone number
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" relative space-y-3     "
            >
              <div className={cn("space-y-3")}>
                {/* gym Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gym name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: Power gym inc - branch 2 "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* phone Number */}

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  rules={{ validate: (value) => isValidPhoneNumber(value) }}
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel>phone number</FormLabel>
                    <FormControl>
                  
                    <PhoneInput
                    // dropdownClass="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    // buttonClass="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground "
                    // searchClass="bg-green"
                    inputClass="flex-1  h-10 w-full border-md           rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    containerClass="flex w-full h-10   "
                    specialLabel=" "
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your number"
country={'us'}



                    
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button className="flex-1 	" type="submit">
                    submit
                    {/* {isLoading ? "Creating Gym..." : "Create Gym "}
                    {isLoading ? (
                      <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.arrowRight className="ml-2 h-4 w-4 " />
                    )} */}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default GymCreateForm;
