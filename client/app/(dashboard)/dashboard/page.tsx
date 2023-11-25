"use client";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";

import axios from "@/lib/axios";
import api from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { useGymStore, useGymsStore } from "@/store/gym";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import EmptyGymShell from "@/components/empty-gym-shell";
import { getCurrentUser } from "@/lib/session";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { useQuery } from "react-query";
import { getAllGyms } from "@/services/gymService";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  
  if (!session?.user) {
    return redirect("/auth/signin");
  }
  const {
    status,
    error,
    data: gyms,
  } = useQuery({
    queryKey: ["gyms"],
    queryFn: getAllGyms,
  });

  if (!gyms || gyms.length === 0) return <EmptyGymShell />;

  // setting or updating gyms state
  const { setGyms } = useGymsStore();
  
  setGyms(gyms);


  //setting or updating the current selected gym
  const { setGym, gym } = useGymStore();
  
  if (gym === null) setGym(gyms[0]);




  redirect(`/dashboard/${gym?.id}/home`);
};

export default Dashboard;
