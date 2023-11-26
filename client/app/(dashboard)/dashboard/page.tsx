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
  useEffect(() => {
    if (!session?.user) {
      return router.replace("/auth/signin");
    }
  }, [session]);

 


  const {
    status,
    error,
    data: gyms,
  } = useQuery({
    queryKey: ["gyms"],
    queryFn:  async ()=>{
const res = await axiosAuth.get('/api/gym/gyms')
return res.data
    }
  });

  console.log("ssssssssssss", gyms);
  if (!gyms || gyms.length === 0) return <EmptyGymShell />;

  // setting or updating gyms state

  setGyms(gyms);

  //setting or updating the current selected gym

  if (gym === null) setGym(gyms[0]);

  redirect(`/dashboard/${gym?.id}/home`);
};

export default Dashboard;
