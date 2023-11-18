"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"


import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { menuItems } from "@/config/dashboard"
import { MobileNav } from "./mobile-nav"
import { Menu } from "lucide-react"


interface HeaderNavProps {
  params: {gymId: string}
  children?: React.ReactNode
}

export function HeaderNav({ params, children }: HeaderNavProps) {
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
        {showMobileMenu ? <Icons.close /> : <Menu />}
        <span className="font-bold">Menu</span>
      </button>
      
      {showMobileMenu && params && (
        <MobileNav params={params}>{children}</MobileNav>
      )}
     
    </div>
  )
}
