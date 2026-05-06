"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserButton from "@/modules/authentication/components/user-button";
import { Button } from "@/components/ui/button";
import { UserProps } from "@/types/user.type";
import { cn } from "@/lib/utils";

const Header = ({ user }: { user: UserProps }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-stone-950/75 backdrop-blur-xl border-b border-stone-900/60"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center">
            <span className="text-stone-950 text-[13px] font-bold tracking-tight">
              N
            </span>
          </div>
          <span className="text-[15px] font-medium text-stone-100 tracking-tight">
            Notionary
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 ml-1 hidden sm:inline">
            LLM
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <UserButton user={user} />
          ) : (
            <Link href="/sign-in">
              <Button className="h-9 px-4 cursor-pointer bg-stone-100 text-stone-950 hover:bg-amber-300 text-sm font-medium tracking-tight transition-colors rounded-md">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
