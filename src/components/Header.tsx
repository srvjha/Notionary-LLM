"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const Header = () => {
  return (
    <header className="w-full shadow-sm border-b border-b-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-9 h-9" />
          <Link
            href="/"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Notionary LLM
          </Link>
        </div>

         <div className="flex items-center gap-6">
         <Button className="cursor-pointer">Sign In</Button>
        </div>
      </div>
    </header>
  );
};
