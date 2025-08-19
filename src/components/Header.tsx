"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, BookOpen, HelpCircle, DollarSign } from "lucide-react";
// import { useTheme } from "next-themes";

export const Header = () => {
  return (
    <header className="w-full shadow-sm bg-white dark:bg-[#171717]/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-300 dark:text-neutral-300 mt-1" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            notecast
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <HelpCircle className="w-5 h-5" />
            Guide
          </button>
          <button className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <DollarSign className="w-5 h-5" />
            Pricing
          </button>

          {/* <Button
            variant="ghost"
            size="icon"
          
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </Button> */}
        </div>
      </div>
    </header>
  );
};
