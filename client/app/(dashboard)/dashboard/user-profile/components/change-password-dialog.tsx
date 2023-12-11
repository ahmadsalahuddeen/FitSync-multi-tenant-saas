"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffcreationSchema } from "@/validators/auth";
import { z } from "zod";
import { useMutation, useQueryClient } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "sonner";
import { useGymStore } from "@/store/gym";

interface ChangePasswordButoonProps extends ButtonProps {}


const changeEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),

})

export function ChangePasswordButoon({
  className,
  variant,
  ...props
}: ChangePasswordButoonProps) {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const { gym } = useGymStore();
  const [showNewGymDialog, setShowNewGymDialog] = React.useState(false);

  type Input = z.infer<typeof changeEmailSchema>;

  const form = useForm<Input>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: changePasswordRequest,

    isError,
    isLoading,
    error,
  } = useMutation({
    mutationFn: async (input: Input) => {
      const response = await axiosAuth.post("/api/gym/staff/invite", {
        email: input.email,
        password: input.password,
      });
      console.log(response, "respones");
      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`Invite in on the way!🚀`);
      setShowNewGymDialog(false);
    },
  });

  async function onSubmit(input: Input) {
    try {
      await changePasswordRequest(input);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={showNewGymDialog} onOpenChange={setShowNewGymDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size='sm' className="text-xs text-primary font-normal border-primary" >
    
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
          This will change your email across all of your FitSync sites.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="youname@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </div>
            <DialogFooter>
              <Button disabled={isLoading} type="submit">
                Change Email
                {isLoading ? (
                  <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.arrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
