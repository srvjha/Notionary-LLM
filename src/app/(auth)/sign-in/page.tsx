"use client";
import { useState } from "react";
import { Github, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Loader } from "@/components/ai-elements/loader";

const SignIn = () => {
  const lastMethod = authClient.getLastUsedLoginMethod();
  const [loadingProvider, setLoadingProvider] = useState<
    "github" | "google" | null
  >(null);

  const handleSignIn = async (provider: "github" | "google") => {
    setLoadingProvider(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please try again.");
      setLoadingProvider(null);
    }
  };

  const GoogleIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-950 relative overflow-hidden">
      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,rgba(251,191,36,0.06),transparent_70%)]"
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-8 w-full max-w-md z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-md bg-amber-400 flex items-center justify-center">
            <span className="text-stone-950 text-base font-bold tracking-tight">
              N
            </span>
          </div>
          <span className="text-xl font-medium text-stone-100 tracking-tight">
            Notionary
          </span>
        </Link>

        <div className="w-full rounded-xl bg-stone-900/40 border border-stone-800 backdrop-blur-md overflow-hidden">
          <div className="p-8 space-y-7">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-medium tracking-tight text-stone-100">
                Welcome back
              </h1>
              <p className="text-sm text-stone-400">
                Sign in to open your notebook
              </p>
            </div>

            <div className="space-y-2.5">
              <Button
                onClick={() => handleSignIn("github")}
                disabled={loadingProvider !== null}
                className="relative w-full h-11 flex items-center justify-center gap-2.5 rounded-md bg-stone-100 hover:bg-amber-300 text-stone-950 font-medium text-sm transition-colors cursor-pointer disabled:opacity-70"
              >
                {loadingProvider === "github" ? (
                  <Loader tone="default" size={5} />
                ) : (
                  <Github className="h-4 w-4" />
                )}
                <span>Continue with GitHub</span>
                {lastMethod === "github" && (
                  <Badge className="absolute right-3 bg-stone-950/10 text-stone-950 border-none text-[10px] uppercase tracking-wider">
                    Last used
                  </Badge>
                )}
              </Button>

              <Button
                onClick={() => handleSignIn("google")}
                disabled={loadingProvider !== null}
                className="relative w-full h-11 flex items-center justify-center gap-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-800 hover:border-stone-700 font-medium text-sm transition-colors cursor-pointer disabled:opacity-70"
              >
                {loadingProvider === "google" ? (
                  <Loader tone="default" size={5} />
                ) : (
                  <GoogleIcon />
                )}
                <span>Continue with Google</span>
                {lastMethod === "google" && (
                  <Badge className="absolute right-3 bg-amber-400/15 text-amber-300 border-none text-[10px] uppercase tracking-wider">
                    Last used
                  </Badge>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-stone-600 font-medium">
              <ShieldCheck className="h-3 w-3" />
              <span>Secure authentication</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-stone-500 max-w-xs leading-relaxed">
          By continuing, you agree to our{" "}
          <Link
            href="#"
            className="text-stone-300 hover:text-amber-400 underline underline-offset-2 transition-colors"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-stone-300 hover:text-amber-400 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
