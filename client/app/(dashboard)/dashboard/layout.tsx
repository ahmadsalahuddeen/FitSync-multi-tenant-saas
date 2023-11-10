import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import GymSwithcer from "@/components/gym-switcher";
import { MainNav } from "@/components/main-nav";
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
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className=" container flex h-16 items-center justify-between py-6 ">
          <div className="flex ">
            
          <MainNav />
          <div className="ml-6 hidden md:block">
            <GymSwithcer />
          </div>
          </div>
          <UserAccountNav
            user={{
              name: `${user.firstName} ${user.lastName}`,
              image: null,
              email: user.email,
            }}
          />
        </div>
      </header>
      <Header />
      <HeaderMobile />

      <main>{children}</main>
    </div>
  );
}
