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
    queryFn:  async ()=>{
const res = await axiosAuth.get('/api/gym/gyms')
return res.data
    }
  });


  useEffect(() => {
    if (!session?.user) {
      return router.replace("/auth/signin");
    }
  }, [session, router]);

 
useEffect(()=>{
  if(gymsData && gymsData.length > 0){
    setGyms(gymsData)

    if(gym === null){
      setGym(gymsData[0]);
      router.replace(`/dashbaord/${gymsData[0].id}/home`)
    }
  }
}, [gymsData, setGyms, setGym, gym, router])



  if (!gymsData || gymsData.length === 0) return <EmptyGymShell />;



  //setting or updating the current selected gym


console.log("ggggggggggg",gymsData)

  router.push(`/dashboard/${gym?.id}/home`);

};

export default Dashboard;
