"use client";
import Container from "@/components/ui/container";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "@/lib/axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useMutation, useQuery } from "react-query";
import { Label } from "@/components/ui/label";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import axiosApi from "@/lib/axios";
import { CommandSeparator } from "@/components/ui/command";
import { cn } from "@/lib/utils";
type Props = {};
const StaffInvite = (props: Props) => {
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("inviteCode");
  const { data: session } = useSession();
  const router = useRouter();

  const { data: gym } = useQuery({
    queryKey: ["gym", inviteCode],
    queryFn: async () => {
      const response = await axiosApi.get(`/api/gym/get-gym-invite-code?inviteCode=${inviteCode}`);
      return response.data;
    },
  });

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="py-3 ">
            <CardHeader>
              <CardTitle>{'Join Fitsyn '}</CardTitle>
              <CardDescription>
              You are invited to join this gym.
              </CardDescription>
            </CardHeader>
            <CardContent>

            <Separator className="my-1 "/>
            </CardContent>
            <CardFooter className="flex justify-between">
             {session ? (
              <Button className="flex-1">
                Join
                
                </Button>

             ): (
              <Link href={'/auth/staff/signup?id=slkdfjsld'}  className={cn(buttonVariants({variant: 'default'}), 'flex-1')}  >
                Create account
                
                </Link>

             )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StaffInvite;
