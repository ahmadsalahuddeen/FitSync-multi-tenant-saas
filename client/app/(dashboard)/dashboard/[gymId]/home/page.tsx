"use client";
import EmptyGymShell from "@/components/empty-gym-shell";
import { getCurrentUser } from "@/lib/session";
import { useGymStore } from "@/store/gym";
import { Gym } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const HomePage = (props: Props) => {

  const router = useRouter();
  const { gym } = useGymStore();


  if (gym === null ) {
    console.log(gym);
    return <EmptyGymShell />;
  }

  return (
    <div>
      {`${JSON.stringify(gym, null, 4)}`}
    </div>
  );
};

export default HomePage;
