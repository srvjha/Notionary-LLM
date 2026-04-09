"use client";
import { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignIn = () => {
  const lastMethod = authClient.getLastUsedLoginMethod();
  const [loadingProvider, setLoadingProvider] = useState<"github" | "google" | null>(null);

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
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-black selection:bg-blue-900 selection:text-blue-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[130px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-800/10 blur-[100px] mix-blend-screen"></div>
      </div>
      
      <div className="relative flex flex-col items-center gap-8 w-full max-w-md z-10">
        <Link href="/" className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-100 to-blue-600 hover:opacity-80 transition-opacity cursor-pointer drop-shadow-[0_0_10px_rgba(37,99,235,0.2)]">
          Notionary LLM
        </Link>
        
        <div className="w-full bg-black/40 border-none rounded-2xl shadow-[0_10px_50px_rgba(30,58,138,0.15)] overflow-hidden backdrop-blur-md relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          <div className="p-8 space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-blue-50">
                Welcome Back
              </h1>
              <p className="text-sm text-blue-200/60 font-medium">
                Sign in securely to access your intelligent notebook
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <Button
                onClick={() => handleSignIn("github")}
                disabled={loadingProvider !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 rounded-xl font-medium transition-all duration-300 bg-blue-900/20 text-blue-100 border-none shadow-[0_4px_20px_rgba(30,58,138,0.15)] hover:bg-blue-900/40 hover:shadow-[0_4px_25px_rgba(30,58,138,0.3)] disabled:opacity-50"
              >
                {loadingProvider === "github" ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                ) : (
                  <Github className="h-5 w-5 text-blue-100" />
                )}
                <span>Continue with GitHub</span>
                {lastMethod === "github" && (
                  <Badge className="absolute right-10 bg-blue-600/20 text-blue-300 border-none hover:bg-blue-600/30">
                    Last used
                  </Badge>
                )}
              </Button>

              <Button
                onClick={() => handleSignIn("google")}
                disabled={loadingProvider !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-6 rounded-xl font-medium transition-all duration-300 bg-blue-900/20 text-blue-100 border-none shadow-[0_4px_20px_rgba(30,58,138,0.15)] hover:bg-blue-900/40 hover:shadow-[0_4px_25px_rgba(30,58,138,0.3)] disabled:opacity-50"
              >
                {loadingProvider === "google" ? (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                ) : (
                  <GoogleIcon />
                )}
                <span>Continue with Google</span>
                {lastMethod === "google" && (
                  <Badge className="absolute right-10 bg-blue-600/20 text-blue-300 border-none hover:bg-blue-600/30">
                    Last used
                  </Badge>
                )}
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-blue-400/50 font-medium">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure authentication</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-blue-200/40">
          By continuing, you agree to our{" "}
          <Link href="#" className="text-blue-400/70 hover:text-blue-300 underline underline-offset-4 transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-400/70 hover:text-blue-300 underline underline-offset-4 transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;