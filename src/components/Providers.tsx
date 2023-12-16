import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type TProviders = {
  children: ReactNode
}

const Providers = ({ children }: TProviders) => {
  return (
    <SessionProvider>{children} </SessionProvider>
  )
}

export default Providers
