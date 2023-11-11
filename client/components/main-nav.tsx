"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"


import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SIDENAV_ITEMS } from "@/config/dashboard"
import { MobileNav } from "./mobile-nav"


interface MainNavProps {

  children?: React.ReactNode
}

export function MainNav({  children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="text-green-600"/>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>



      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && SIDENAV_ITEMS && (
        <MobileNav items={SIDENAV_ITEMS}>{children}</MobileNav>
      )}
     
    </div>
  )
}
