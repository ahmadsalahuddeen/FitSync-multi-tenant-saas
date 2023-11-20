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
import { useGymStore } from "@/store/gym";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import EmptyGymShell from "@/components/empty-gym-shell";

type Props = {};

const Dashboard = (props: Props) => {
  const router = useRouter();
  //  router.refresh()
  const { data: session } = useSession();
  console.log(session);
  if (!session?.user) {
    router.refresh();
    return redirect("/auth/signin");
  }
  const gym = useGymStore((state) => state.gym);


  if (gym == null)
    return (
      <EmptyGymShell/>
    );

  redirect(`/dashboard/${gym.gymId}/home`);
};

export default Dashboard;
