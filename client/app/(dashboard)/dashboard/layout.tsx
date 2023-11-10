import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: `Dashboard - ${siteConfig.name}`,
  description: siteConfig.description
}




export default function RootLayout({
children,
}: {
  children: React.ReactNode
}){
  return (
    <div>
      <Header/>
      <HeaderMobile/>
      <main >  

      {children}
      </main>
    </div>
  )
}