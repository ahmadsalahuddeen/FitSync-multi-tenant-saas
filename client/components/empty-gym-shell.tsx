"use client";
import React from "react";
import { DashboardShell } from "./dashboard-shell";
import { EmptyPlaceholder } from "./empty-placeholder";
import GymCreateButton from "./create-gym-button";
import Image from "next/image";

type Props = {};

const EmptyGymShell = (props: Props) => {
  return (
    <>
      <DashboardShell>
        <EmptyPlaceholder>
          {/* <EmptyPlaceholder.Icon name="logo" /> */}
          <Image
            className="hidden scale-0 dark:block dark:scale-100"
            src="/images/illustrations/gymDark.svg"
            width="170"
            height="170"
            alt="Image"
          />
          <Image
            className="dark:hidden"
            src="https://illustrations.popsy.co/lime/weight-lifting.svg"
            width="170"
            height="170"
            alt="Image"
          />
          <EmptyPlaceholder.Title>Welcome to FitSync!</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any Gym added yet. Add one right away.
          </EmptyPlaceholder.Description>

          <GymCreateButton />
        </EmptyPlaceholder>
      </DashboardShell>
    </>
  );
};

export default EmptyGymShell;
