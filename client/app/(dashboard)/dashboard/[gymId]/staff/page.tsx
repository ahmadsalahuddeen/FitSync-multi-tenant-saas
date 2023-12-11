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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/card-skeleton";
import { Separator } from "@/components/ui/separator";

type Props = {};

const StaffPage = (props: Props) => {
  const { gym } = useGymStore();
  const axiosApi = useAxiosAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["Staff", gym.id],
    queryFn: async () => {
      
      const response = await axiosApi.get(`/api/gym/staff/${gym.id}`);
      return response.data;
    },
    onError: (error: any) => {
      error.response.data.errors.map((err: any) => {
        toast.error(err.message);
      });
    },
    onSuccess: (data) => {
      // toast.success(data[0].name);
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading={`Staff Management`} text="Add and manage you staff's here ">
        <StaffCreateButton />
      </DashboardHeader>
      <Separator className="my-6" />

      {isLoading ? (
      <CardSkeleton />
        ):(
    <>
          

      <StaffDataTable data={data} columns={columns} /> 
    </>
      )}
    </DashboardShell>
  );
};

export default StaffPage;
