"use client";
import  { axiosAuth } from "@/lib/axios";
import { useGymStore } from "@/store/gym";
import { useSession } from "next-auth/react";
import { useEffect } from "react";



// hook to manage headers in axios request with accestoken 
const useAxiosAuth =  () => {

  const {gym } = useGymStore()

  const { data: session } =  useSession();
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.backendTokens?.accessToken}`;
        }
        if(gym.id !== ''){
          config.params.gymId = gym.id
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session]);
  return axiosAuth;
};


export default useAxiosAuth;