"use client"

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TProviders extends ThemeProviderProps {
  children: ReactNode
}
const query_client = new QueryClient();

const Providers = ({ children, ...props }: TProviders) => {
  return (
    <QueryClientProvider client={query_client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...props}>
        <SessionProvider>{children} </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers
