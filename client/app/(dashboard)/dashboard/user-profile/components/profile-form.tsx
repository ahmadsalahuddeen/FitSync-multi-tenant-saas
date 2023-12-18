"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useSession } from "next-auth/react";
import { ChangeEmailButoon } from "./change-email-dialog";
import { ChangePasswordButoon } from "./change-password-dialog";
import React from "react";
import { useQuery } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Staff } from "@/types/types";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "name must not be longer than 30 characters.",
    }),

  bio: z.string().max(300).optional(),
  image: z.string().optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// ------ start
export function ProfileForm() {
  const { data: session, update } = useSession();
  const axiosApi = useAxiosAuth();

  const { data: userData } = useQuery<Staff>({
    queryKey: ["getCurrentUser", session?.user.id],
    queryFn: async () => {
      const res = await axiosApi.get("/api/auth/users/currentUser");
      return res.data;
    },
    onError: (error: any) => {
      error.response.data.errors.map((err: any) => {
        toast.error(err.message);
      });
    },
  });

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    name: userData?.name,
    bio: userData?.bio || "",
    image: userData?.image
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      {session?.user.name[0]}
      {JSON.stringify(session?.user, null, 4)}
      <form onSubmit={form.handleSubmit(onSubmit)} className="ml-1 space-y-8">
        {/* <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              className="border-0 pl-0   focus-visible:ring-0 focus-visible:ring-offset-0"
              readOnly
              placeholder={userData?.email}
              // value={userData.email}
            />
          </FormControl>
          <FormDescription>
            <ChangeEmailButoon />
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              className="border-0 pl-0   focus-visible:ring-0 focus-visible:ring-offset-0"
              readOnly
              placeholder="********"
            />
          </FormControl>
          <FormDescription>
            <ChangePasswordButoon />
          </FormDescription>
          <FormMessage />
        </FormItem> */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input defaultValue={userData?.name} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className="flex items-center  space-x-4">
                  <Avatar>
                    <AvatarImage src={session?.user?.image} alt="Image" />
                    <AvatarFallback>
                      {session?.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <Input className="max-w-sm" id="picture" type="file"  defaultValue={session?.user.image}/>
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  defaultValue={userData?.bio}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
