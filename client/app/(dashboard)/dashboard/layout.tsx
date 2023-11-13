import GymSwithcer from "@/components/gym-switcher";
import { MainNav } from "@/components/main-nav";
import { DashboardShell } from "@/components/dashboard-shell";
import {SideNav} from "@/components/side-nav";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { siteConfig } from "@/config/site";
import { getCurrentUser } from "@/lib/session";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
        <MainNav />
        <div className="flex">
<div className="hidden md:block">

        <GymSwithcer className="mr-4 "/>
</div>
          <UserAccountNav
            user={{
              name: `${user.lastName} ${user.lastName}`,
              image: null,
              email: user.email,
            }}
            />
            </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SideNav  />
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
