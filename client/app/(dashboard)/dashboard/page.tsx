"use client";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React, { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

import { useGymStore, useGymsStore } from "@/store/gym";

import EmptyGymShell from "@/components/empty-gym-shell";

import { useQuery } from "react-query";

import { redirect, useRouter } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();

  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const { setGyms, gyms } = useGymsStore();
  const { setGym, gym } = useGymStore();

  
  
  // api call to get all gyms tied to accoundID if role is "onwer" || user.id if role is "member"
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
  
  
  // auth checks
  useEffect(() => {
    if (!session?.user) {
      return router.replace("/auth/signin");
    }
  }, [session, router]);
  
  
  
  // set gyms and gym state if it's empty
  useEffect(() => {
    if (gymsData && gymsData.length > 0) {
      setGyms(gymsData);
      
      if (  !gym.id   ) {
        
        
        setGym(gymsData.gyms);
        router.push(`/dashboard/${gymsData[0].id}/home`);
      }
    }
  }, [gymsData, setGyms, setGym, gym, router]);
  
  
  
  // redirect to home page with gym.id 
  if(gym.id){
    router.push(`/dashboard/${gym.id}/home`)
  }


  //if (gyms.length === 0) {
   // console.log(gymsData);
    return <EmptyGymShell />;
  // }
  //  else {
  //   redirect(`/dashboard/${gym?.id}ghjghjghj/home`);
  // }
};

export default Dashboard;
