"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Define the props type for the Providers component
type ProvidersProps = {
  children: ReactNode;
};

/**
 * Providers component that wraps the application with necessary providers
 * Currently includes SessionProvider for NextAuth.js authentication
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
