import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { ProfileForm } from "./components/profile-form";

type Props = {};
const UserProfilePage = (props: Props) => {
                                         
  const session = getServerSession()

  
  
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading={`My Profile`} text="Manage personal account settings" />
      </DashboardShell>
      <Separator className="my-6" />
      <div className="lg:max-w-2xl">

      <ProfilseForm />
      </div>

    </>
  );
};

export default UserProfilePage;
