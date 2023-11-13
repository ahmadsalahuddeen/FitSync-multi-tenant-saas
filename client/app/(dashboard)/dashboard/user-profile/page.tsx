import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};
const UserProfilePage = (props: Props) => {

  const session = getServerSession()

  
  
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading={`My Profile`} text="Manage personal account settings" />
      </DashboardShell>
    </>
  );
};

export default UserProfilePage;
