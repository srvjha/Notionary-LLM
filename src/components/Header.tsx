"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen, HelpCircle, DollarSign, LogIn } from "lucide-react";
import Link from "next/link";
// import { useTheme } from "next-themes";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="w-full shadow-sm bg-white dark:bg-[#171717]/50 border-b border-b-neutral-800/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-9 h-9" />
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            Notecast
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton>
              <Button variant="outline">
                Sign In
                <LogIn className="w-4 h-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
