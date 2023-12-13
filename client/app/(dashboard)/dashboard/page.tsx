"use client";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React, { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

import { useGymStore, useGymsStore } from "@/store/gym";

import EmptyGymShell from "@/components/empty-gym-shell";

import { useQuery } from "react-query";

import { redirect, useRouter } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "sonner";
import { Gym } from "@/types/types";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { setGyms } = useGymsStore();
  const { setGym } = useGymStore();

  // auth checks
  useEffect(() => {
    if (!session?.user) {
      return router.replace("/auth/signin");
    }
  }, [session, router]);

  // api call to get all gyms tied to accoundID if role is "onwer" || user.id if role is "member"

  const { status, error, data, refetch, isLoading } = useQuery<Gym[]>({
    queryKey: ["gymsDataHome", session?.user.id],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/gym/gyms");

      return res.data;
    },
    enabled: true, // Ensure that the query is enabled

    onError: (error: any) => {
      error.response.data.errors.map((err: any) => {
        toast.error(err.message);
      });
    },
  });

  console.log(isLoading);

  useEffect(() => {
    if (!isLoading) {
      if (data && data?.length > 0) {
        setGyms(data);
        setGym(data[0]);
        redirect(`/dashboard/${data[0].id}/home`);
      }
    }
  }, [isLoading]);

  // Redirect to home page with gym.id if gym.id exists
  if (isLoading)
    return (
      <>
        <Card>
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-4 w-4/5" />
          </CardHeader>
          <CardContent className="h-10" />
          <CardFooter>
            <Skeleton className="h-8 w-[120px]" />
          </CardFooter>
        </Card>
      </>
    );
  if (!data || data?.length === 0)
    return (
      <>
        <EmptyGymShell />
      </>
    );
};

export default Dashboard;
