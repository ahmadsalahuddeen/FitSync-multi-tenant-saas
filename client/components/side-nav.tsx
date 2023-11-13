'use client'
import { SIDENAV_ITEMS } from "@/config/dashboard";
import React, { useState } from "react";
import { SideNavItem } from "@/types/types";

import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
type Props = {};

export const SideNav = (props: Props) => {
  return (
  <div className="grid items-start  gap-2 fixed  ">


      {SIDENAV_ITEMS.map((item, idx) => {
        return <MenuItem key={idx} item={item} />;
      })}
  </div>

  )
};



export const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex items-center rounded-md px-3 py-2 w-full hover-bg-accent text-sm font-medium justify-between hover:bg-accent hover:text-accent-foreground ${
              pathname.includes(item.href) ? 'bg-accent' : ''
            }`}
          >
            <div className="flex flex-row  items-start">
              {item.icon}
              <span className="">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <ChevronDown className="h-5 w-5" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.href}
                    className={`text-sm ${
                      subItem.href === pathname ? 'font-semibold  ' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent",
          )}
        >
          {item.icon}
          <span >{item.title}</span>
        </Link>
      )}
    </div>
  );
};