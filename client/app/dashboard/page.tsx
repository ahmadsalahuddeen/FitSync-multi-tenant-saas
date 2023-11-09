'use client'
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";


import axios from "@/lib/axios";
import api from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";

type Props = {};


const Dashboard =  (props: Props) => {
   const {data : session}  = useSession()

console.log(session)
  
  return <div >

<h1 onClick={()=> signOut( {redirect: true, callbackUrl: '/'})}>

    {!session?.user ? 'login' : 'logout'}
</h1>
    
    </div>;
};

export default Dashboard;
