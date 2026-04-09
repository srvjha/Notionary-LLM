import Link from "next/link";
import UserButton from "@/modules/authentication/components/user-button";
import { Button } from "@/components/ui/button";
import { UserProps } from "@/types/user.type";

const Header = async ({user}:{user:UserProps}) => {
  return (
    <header className="w-full bg-transparent backdrop-blur-xl shadow-[0_8px_30px_rgba(30,58,138,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src="/favicon.ico" alt="Logo" className="w-[38px] h-[38px] rounded-lg shadow-sm" />
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400 hover:opacity-80 transition-opacity"
          >
            Notionary LLM
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <UserButton user={user} />
          ) : (
            <Link href="/sign-in">
              <Button className="cursor-pointer bg-blue-900/20 text-blue-100 hover:bg-blue-900/40 hover:text-white transition-all shadow-[0_4px_20px_rgba(30,58,138,0.2)] hover:shadow-[0_4px_25px_rgba(30,58,138,0.4)] font-medium px-6 rounded-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
