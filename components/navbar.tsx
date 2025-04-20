"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import NavbarSignOutButton from "./NavbarSignOutButton";
import { Button } from "@/components/ui/button"; // Import the new Button
import { CircleUser, Menu } from "lucide-react"; // Import icons

// Reference logo using root-relative path for static assets in /public
const logoPath = "/logo-noshine.png";

// Define props interface
interface NavbarProps {
  isLoggedIn: boolean;
  userName: string | null; // Add userName prop
}

export default function Navbar({ isLoggedIn, userName }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      // Reduced vertical padding
      className={`sticky top-0 z-50 w-full py-2 font-sans 
                 bg-[rgba(13,48,75,0.85)] backdrop-blur-sm shadow-md 
                 border-b border-[#185686]`}
    >
      {/* Desktop Navigation (md and up) */}
      <div className="max-w-7xl mx-auto px-4 hidden md:flex justify-between items-center">
        {/* Left Side: Logo + Links */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image
              src={logoPath}
              alt="Pidro Logo"
              height={40}
              width={100}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <ul className="flex list-none space-x-6 items-center">
            <li>
              <Link href="/" className="text-white hover:text-[#ffe230]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/how-to-play-pidro"
                className="text-white hover:text-[#ffe230]"
              >
                How to Play Pidro
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white hover:text-[#ffe230]">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                className="text-white hover:text-[#ffe230]"
              >
                Changelog
              </Link>
            </li>
            <li>
              <Link
                href="mailto:pidrohelp@gmail.com"
                className="text-white hover:text-[#ffe230]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Account/Login Panel */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 bg-yellow-900/70 rounded-md px-3 py-1 shadow-inner">
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-100 hover:text-white"
              >
                My Profile
              </Link>
              {userName && (
                <span className="text-sm text-[#ffe230]">Hi, {userName}</span>
              )}
              <NavbarSignOutButton />
            </div>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <Button variant="glass" size="sm">
                Player Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation (up to md) - Now using Grid and Button component */}
      <div className="md:hidden px-4 grid grid-cols-3 items-center h-16">
        {/* Hamburger Button (Left - Col 1) - Now uses Button component */}
        <Button
          variant="glass"
          size="icon"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="justify-self-start"
        >
          <Menu className="h-5 w-5" /> {/* Use Menu icon */}
        </Button>

        {/* Centered Logo (Mobile - Col 2) */}
        <div className="justify-self-center">
          <Link href="/">
            <Image
              src={logoPath} // logoPath needs to be defined
              alt="Pidro Logo"
              height={56} // Adjusted height based on user edit
              width={140} // Adjusted width proportionally
              priority
              className="h-14 w-auto"
            />
          </Link>
        </div>

        {/* Right side Login/Logout Button (Mobile - Col 3) */}
        <div className="justify-self-end">
          {isLoggedIn ? (
            // Assuming NavbarSignOutButton might use Button internally later
            <NavbarSignOutButton />
          ) : (
            <Link href="/login" passHref legacyBehavior>
              {/* Use Button with icon */}
              <Button
                variant="glass"
                aria-label="Login"
                size="icon"
                iconPosition="left"
              >
                <CircleUser className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel - Slides down */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[rgba(13,48,75,0.95)] backdrop-blur-sm pb-4 shadow-lg border-t border-[#185686]">
          <ul className="flex flex-col items-center list-none space-y-2 pt-4">
            {/* Mobile links */}
            <li>
              <Link
                href="/"
                className="text-white hover:text-[#ffe230] block py-2"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/how-to-play-pidro"
                className="text-white hover:text-[#ffe230] block py-2"
                onClick={toggleMobileMenu}
              >
                How to Play Pidro
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-white hover:text-[#ffe230] block py-2"
                onClick={toggleMobileMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/changelog"
                className="text-white hover:text-[#ffe230] block py-2"
                onClick={toggleMobileMenu}
              >
                Changelog
              </Link>
            </li>
            <li>
              <Link
                href="mailto:pidrohelp@gmail.com"
                className="text-white hover:text-[#ffe230] block py-2"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
            </li>

            <li className="w-full px-4">
              <hr className="border-white/10 my-2" />
            </li>

            {/* Auth links/Login for mobile */}
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="text-white hover:text-[#ffe230] block py-2"
                    onClick={toggleMobileMenu}
                  >
                    My Profile
                  </Link>
                </li>
                {/* Hi Username could be added here too if desired */}
                {/* Add other auth links for mobile here */}
              </>
            ) : (
              <li>{/* Login link is already in the top bar for mobile */}</li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
