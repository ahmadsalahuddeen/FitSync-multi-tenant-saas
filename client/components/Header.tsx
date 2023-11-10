"use client";
import React from "react";

import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/user-scroll";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(
        "sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 transition-all",
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white/75 ": selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row items-center justify-center space-x-3 md:hidden"
          >
            <span className="h-7 w-7 rounded-lg bg-zinc-300" />
            <span className="flex text-xl font-bold"> LOGO</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <span className="font-semibold text-sm">HQ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
