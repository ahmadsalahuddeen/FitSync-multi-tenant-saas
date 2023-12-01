"use client";
import React from "react";
import { DashboardShell } from "./dashboard-shell";
import { EmptyPlaceholder } from "./empty-placeholder";
import GymCreateButton from "./create-gym-button";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {};

const EmptyGymShell = (props: Props) => {
  const {data: session } = useSession()
  
  return (
    <>
    {session?.user.role === 'owner' ? (

      <DashboardShell>
        <EmptyPlaceholder>
          {/* <EmptyPlaceholder.Icon name="logo" /> */}
          <Image
            className="hidden scale-0 dark:block dark:scale-100"
            src={"/images/illustrations/gymDark.svg"}
            width="170"
            height="170"
            alt="Image"
            placeholder="blur"
            blurDataURL={"/images/illustrations/gymDark.svg"}

          />
          <Image
            className="dark:hidden"
            src={"/images/illustrations/gymLight.svg"}
            
            width="170"
            height="170"
            alt="Image"
            placeholder="blur"
            blurDataURL={"/images/illustrations/gymLight.svg"}
          />
          <EmptyPlaceholder.Title>Welcome to FitSync!</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any Gym added yet. Add one right away.
          </EmptyPlaceholder.Description>

          <GymCreateButton />
        </EmptyPlaceholder>
      </DashboardShell>
    ) : (
      <DashboardShell>
        <EmptyPlaceholder>
          {/* <EmptyPlaceholder.Icon name="logo" /> */}
          <Image
            className="hidden scale-0 dark:block dark:scale-100"
            src={"/images/illustrations/gymDark.svg"}
            width="170"
            height="170"
            alt="Image"
            placeholder="blur"
            blurDataURL={"/images/illustrations/gymDark.svg"}

          />
          <Image
            className="dark:hidden"
            src={"/images/illustrations/gymLight.svg"}
            
            width="170"
            height="170"
            alt="Image"
            placeholder="blur"
            blurDataURL={"/images/illustrations/gymLight.svg"}
          />
          <EmptyPlaceholder.Title>request an invitation from the administrator!</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>

          </EmptyPlaceholder.Description>


        </EmptyPlaceholder>
      </DashboardShell>

    )}
    </>
  );
};

export default EmptyGymShell;
