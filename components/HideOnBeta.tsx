"use client";

import { usePathname } from "next/navigation";

// /beta and /new are single-purpose pages: no site navigation around them.
export default function HideOnBeta({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (/^\/(beta|new)(\/|$)/.test(pathname)) return null;
  return <>{children}</>;
}
