'use client'
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import React from "react";

import { getServerSession } from "next-auth";
import axios from "@/lib/axios";
import api from "@/lib/axios";

type Props = {};


const Dashboard = async (props: Props) => {
  const session = getServerSession()
const onclick = async ()=>{
const res = await api.get('/api/auth/users/currentUser')
console.log(res)
}
  
  return <div>
    <h1 className="hover:cursor-pointer" onClick={()=>{onclick()}}>sdfsdf</h1>
    
    {!session ? 'login' : 'logout'}
    </div>;
};

export default Dashboard;
