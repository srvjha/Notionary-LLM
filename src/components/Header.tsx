import Link from "next/link";
import { currentUser } from "@/modules/authentication/actions";
import UserButton from "@/modules/authentication/components/user-button";
import { Button } from "./ui/button";

export const Header = async () => {
  const user = await currentUser();
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
          {user ? (
            <UserButton user={user} />
          ) : (
            <Link href="/sign-in">
              <Button className="cursor-pointer">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
