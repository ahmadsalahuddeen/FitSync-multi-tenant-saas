

import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";

import axios from "@/lib/axios";
import api from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { useGymStore } from "@/store/gym";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import EmptyGymShell from "@/components/empty-gym-shell";
import { getCurrentUser } from "@/lib/session";

type Props = {};



const Dashboard = async (props: Props) => {
const gym = useGymStore.getState().gym
  //  router.refresh()
  const user = await  getCurrentUser();
  console.log(user);
  if (!user) {

    return redirect("/auth/signin");

  }


  if (user.gyms == null)
    return (
      <EmptyGymShell/>
    );

  redirect(`/dashboard/${gym}/home`);
};

export default Dashboard;
