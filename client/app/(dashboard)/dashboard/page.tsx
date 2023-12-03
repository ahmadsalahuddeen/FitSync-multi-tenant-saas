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
  useEffect(() => {
    useGymStore.persist.rehydrate();

  }, []);
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
    refetch
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
  
  
  
 // Set gyms and gym state if gymsData is available
  useEffect(() => {
    if (gymsData && gymsData.length > 0) {
      setGyms(gymsData);
      
      if (  !gym?.id || gym?.id == ''   ) {
        
        
        setGym(gymsData.gyms);
        redirect(`/dashboard/${gymsData[0].id}/home`);
      }
    }
  }, [gymsData, setGyms, setGym, gym, router]);
  
  
  // Redirect to home page with gym.id if gym.id exists
  useEffect(() => {
    if (gym?.id) {
      redirect(`/dashboard/${gym?.id}/home`);
    }
  }, [gym, router]);


  if (gyms.length === 0) {
    return <EmptyGymShell />;
  }

};

export default Dashboard;
