"use client";
import React, { useState } from "react";
import { SideNavItem } from "@/types/types";

import { useParams, usePathname } from "next/navigation";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { initalMenuItems, menuItems } from "@/config/dashboard";
import { Button } from "./ui/button";
type Props = {
  params: { gymId: string };
};

export const SideNav = ({ params }: Props) => {
  let menu = menuItems(params.gymId);

  if (!params.gymId || params.gymId == 'undefined') {
    menu = initalMenuItems();
  }

  return (
    <div className="fixed grid  items-start gap-2  ">
      {menu.map((item, idx) => {
        return <MenuItem key={idx} item={item} />;
      })}
    </div>
  );
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
          <Button
            variant="ghost"
            onClick={toggleSubMenu}
            className={`hover-bg-accent flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
              pathname.includes(item.href)
                ? "bg-accent"
                : "" || (item.disabled && "hover:cursor-not-allowed")
            } ${item.disabled ? "hover:cursor-not-allowed" : ""}`}
            disabled={item.disabled}
          >
            <div className="flex flex-row  items-start">
              {item.icon}
              <span className="">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown className="h-5 w-5" />
            </div>
          </Button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.href}
                    className={`text-sm ${
                      subItem.href === pathname ? "font-semibold  " : ""
                    } `}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link href={item.href}>
          <Button
            disabled={item.disabled}
type="button"
            variant="ghost"
            className={cn(
              "hover-bg-accent flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent",
            )}
          >
            <div className="flex flex-row  items-start">
              {item.icon}
              <span className="">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <p>{""}</p>
            </div>
            {/* {item.icon}
          <span >{item.title}</span> */}
          </Button>
        </Link>
      )}
    </div>
  );
};
