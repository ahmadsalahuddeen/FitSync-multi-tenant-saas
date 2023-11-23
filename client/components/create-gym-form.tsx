import React from "react";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./icons";
import { z } from "zod";
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

type Props = {};

const GymCreateForm = (props: Props) => {
  type Input = z.infer<typeof gymcreationSchema>;

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
    } catch (err) {
      console.log(err);
    }
  }

  const watcher = form.watch();

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
                          placeholder="Power gym inc or location "
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
                <p className=" text-end text-xs text-muted-foreground">
                  <Link
                    href="/auth/forgot-password"
                    className="hover:text-brand underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </p>

                <div className="flex gap-4">
                  <Button disabled={isLoading} className="flex-1	" type="submit">
                    {isLoading ? "Signing In..." : "Sign In "}
                    {isLoading ? (
                      <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.arrowRight className="ml-2 h-4 w-4 " />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default GymCreateForm;
