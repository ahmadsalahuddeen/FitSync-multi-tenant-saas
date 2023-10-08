import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from "next/font/google"
import localFont from "@next/font/local"
import "@/app/globals.css"
import { SiteFooter } from '@/components/site-footer'



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})



export const metadata: Metadata = {
  title: 'FitSync',
  description: 'A complete gym management SAAS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
         className={cn(
          " min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            
          >
            {children}
            <SiteFooter/>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
