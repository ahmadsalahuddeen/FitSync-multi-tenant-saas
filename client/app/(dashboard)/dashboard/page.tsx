
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";


import axios from "@/lib/axios";
import api from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCurrentUser } from "@/lib/session";

type Props = {};


const Dashboard = async (props: Props) => {
   
const user = await getCurrentUser()

  
  return <div >


    {!user ? 'login' : 'logout'}

    
    </div>;
};

export default Dashboard;
