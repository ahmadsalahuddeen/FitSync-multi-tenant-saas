
import GymSwithcer from "@/components/gym-switcher";
import { HeaderNav } from "@/components/header-nav";
import { DashboardShell } from "@/components/dashboard-shell";
import { SideNav } from "@/components/side-nav";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { Metadata } from "next";
import { notFound, useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { menuItems } from "@/config/dashboard";
import { useGymStore } from "@/store/gym";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description: siteConfig.description,
};

export default async function RootLayout({
  
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
 

  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <>

      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <HeaderNav params={params} />
            <div className="flex">
              <div className="hidden justify-between gap-4 px-4 md:block">
                <GymSwithcer className="mr-6"/>
                <ThemeToggle />
              </div>
              <UserAccountNav
                user={{
                  name: `${user.name}`,
                  image: user.image ||null,
                  email: user.email,
                }}
              />
            </div>
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <SideNav   />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </div>



    </>
  );
}
