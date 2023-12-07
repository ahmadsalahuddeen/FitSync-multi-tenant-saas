"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { StaffCreateButton } from "@/components/staff-invite-button";
import React from "react";
import { StaffDataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useQuery } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "sonner";
import { useGymStore, useGymsStore } from "@/store/gym";

type Props = {};

const StaffPage = (props: Props) => {
  const {gym}   = useGymStore()
  const axiosApi = useAxiosAuth();

  const { data } = useQuery({
    queryKey: ["Staff"],
    queryFn: async () => {
      console.log('gggg') 
      try {
        
        const response = await axiosApi.get(`/api/gym/staff/${gym.id}`);
        return response.data;
      } catch (error) {
        console.log(error)
      }

    },
    onError: (error: any) => {
      error.response.data.errors.map((err: any) => {
        toast.error(err.message);
      });
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading={`Staff Management`}>
        <StaffCreateButton />
      </DashboardHeader>
    {data}
      {/* <StaffDataTable data={data} columns={columns} />  */}
    </DashboardShell>
  );
};

export default StaffPage;
