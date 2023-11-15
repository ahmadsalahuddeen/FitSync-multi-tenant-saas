
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";


import axios from "@/lib/axios";
import api from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

type Props = {};



const Dashboard = async (props: Props) => {
   
const user = await getCurrentUser()

if(!user){
    return  redirect('/auth/signin')
}  

const gym = user.gyms[0]

if(!gym) return(
    <EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No gyms created</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      You don&apos;t have any Gym yet. Add one right away.
    </EmptyPlaceholder.Description>
    TODO: add Gym Create button
    {/* <GymCreateButton variant="outline" /> */}
  </EmptyPlaceholder>
)

redirect(`${gym.gymId}`)
};

export default Dashboard;
