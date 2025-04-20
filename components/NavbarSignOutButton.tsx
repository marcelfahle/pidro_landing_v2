"use client";

import { signOut } from "next-auth/react";
import React from "react";

// Simple button component for Navbar sign out
export default function NavbarSignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" }); // Redirect to login after sign out
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2 bg-transparent hover:bg-white/10"
    >
      Sign Out
    </button>
  );
}
