"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  // session?: Session | null; // No need to pass session for App Router
}

export default function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
