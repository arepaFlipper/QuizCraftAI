"use client"

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type TProviders = {
  children: ReactNode
}

const Providers = ({ children, ...props }: TProviders) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      <SessionProvider>{children} </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
