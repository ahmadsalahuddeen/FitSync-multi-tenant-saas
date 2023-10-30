import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types"

import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster richColors position='top-right' />

      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
