import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import localFont from "@next/font/local";
import "@/app/globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/Providers";
import Axios from "axios";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "FitSync",
  description: "A complete gym management SaaS",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontHeading.variable,
          )}
        >
          {/* configquered and sepreated Providers in a different file */}
          <Providers>{children}
          </Providers>
        </body>
      </html>
    </>
  );
}
