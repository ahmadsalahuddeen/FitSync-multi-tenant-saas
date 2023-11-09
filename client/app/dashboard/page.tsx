'use client'
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";


import axios from "@/lib/axios";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";

type Props = {};


const Dashboard =  (props: Props) => {
   const {data : session}  = useSession()


  
  return <div>
<h1>{}</h1>
    
    {!session?.user ? 'login' : 'logout'}
    </div>;
};

export default Dashboard;
