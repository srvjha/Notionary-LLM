"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen, HelpCircle, DollarSign } from "lucide-react";
import Link from "next/link";
// import { useTheme } from "next-themes";

export const Header = () => {
  return (
    <header className="w-full shadow-sm bg-white dark:bg-[#171717]/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-9 h-9" />
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Notecast
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/guide">
            <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <HelpCircle className="w-5 h-5" />
              Guide
            </button>
          </Link>
          {/* <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <DollarSign className="w-5 h-5" />
            Pricing
          </button> */}

         
        </div>
      </div>
    </header>
  );
};
