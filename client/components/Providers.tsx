"use client";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}
       
        
        </SessionProvider>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default Providers;
