"use client"

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TProviders extends ThemeProviderProps {
  children: ReactNode
}
const query_client = new QueryClient();

const Providers = ({ children, ...props }: TProviders) => {
  return (
    <QueryClientProvider client={query_client}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
        <SessionProvider>{children} </SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}

export default Providers
