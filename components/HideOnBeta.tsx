"use client";

import { usePathname } from "next/navigation";

// /beta is a single-purpose install page: no site navigation around it.
export default function HideOnBeta({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/beta" || pathname.startsWith("/beta/")) return null;
  return <>{children}</>;
}
