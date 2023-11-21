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
          <svg
            src="https://illustrations.popsy.co/yellow/woman-on-laptop-excel.svg"
            width="160"
            height="160"
            className="-mb-5"
            alt="Image"
          />
          <EmptyPlaceholder.Title>Welcome to FitSync 🥳</EmptyPlaceholder.Title>
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
