"use client";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React, { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

import { useGymStore, useGymsStore } from "@/store/gym";

import EmptyGymShell from "@/components/empty-gym-shell";

import { useQuery } from "react-query";
import { Gym } from "@/services/gymService";
import { redirect, useRouter } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { setGyms } = useGymsStore();
  const { setGym, gym } = useGymStore();
  const {
    status,
    error,
    data: gymsData,
  } = useQuery({
    queryKey: ["gymsData"],
    queryFn: async () => {
      const res = await axiosAuth.get("/api/gym/gyms");
      
      return res.data;
      
    },
  });

  useEffect(() => {
    if (!session?.user) {
      return router.replace("/auth/signin");
    }
  }, [session, router]);

  useEffect(() => {
    if (gymsData && gymsData.length > 0) {
      setGyms(gymsData);

      if (gym === null) {
      console.log('gymsdata.gyms: ', gymsData.gyms)

        setGym(gymsData.gyms);
        router.replace(`/dashbaord/${gymsData.gyms.id}/home`);
      }
    }
  }, [gymsData, setGyms, setGym, gym, router]);

  console.log("object", gymsData);
  if (!gymsData || !gymsData.gyms || gymsData.gyms.length === 0) {
    console.log(gymsData);
    return <EmptyGymShell />;
  } else {
    redirect(`/dashboard/${gym?.id}/home`);
  }
};

export default Dashboard;
