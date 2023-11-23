import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Dumbbell } from "lucide-react"
import { Icons } from "./icons"



export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.brandIcon  />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              salahKenb
            </a>
            . Hosted on{" "}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              127.0.0.1
            </a>
            . Illustrations by{" "}
            <a
              href="https://popsy.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Popsy
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>

      </div>
    </footer>
  )
}
