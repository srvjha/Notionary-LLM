"use client";
import { useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignIn = () => {
   const lastMethod = authClient.getLastUsedLoginMethod();
  console.log({lastMethod})
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
     
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black opacity-80"></div>
      
      <div className="relative flex flex-col items-center gap-8 w-full max-w-md">
        <Link href="/" className="text-4xl font-light tracking-tight text-neutral-300 hover:text-white transition-colors cursor-pointer">
          Notionary LLM
        </Link>
        
        <div className="w-full bg-white rounded-lg shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm flex justify-center items-center">
          <div className="p-8 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Sign In
              </h1>
              <p className="text-sm text-gray-600">
                Continue securely using your preferred account
              </p>
            </div>

            <div className="space-y-8 pt-2">
              <Button
                onClick={() => handleSignIn("github")}
                className="w-full cursor-pointer flex items-center justify-center gap-3 px-2 py-3 rounded-lg font-medium transition-all duration-200 
                bg-white text-neutral-900 border-b-2 border-t-1 border-l-1 border-r-1 border-l-neutral-300 border-r-neutral-300 border-t-neutral-300 border-b-neutral-900  hover:bg-black hover:text-neutral-100 hover:shadow-md
                "
              >
                <Github className="h-5 w-5" />
                <span>Continue with GitHub</span>
                {lastMethod === "github" && (
                  <Badge className="ml-10 -mt-10">
                    Last used
                  </Badge>
                )}
              </Button>

              <Button
                onClick={() => handleSignIn("google")}
              
                className="w-full cursor-pointer flex items-center justify-center gap-3 px-2 py-3 rounded-lg font-medium transition-all duration-200 
                     bg-white text-gray-900 border-b-2 border-t-1 border-l-1 border-r-1 border-l-neutral-300 border-r-neutral-300 border-t-neutral-300 border-b-blue-800 hover:bg-blue-400 hover:text-white  hover:shadow-md
                "
              >
                <GoogleIcon />
                <span>Continue with Google</span>
                { lastMethod === "google" && (
                  <Badge  variant="secondary"  className="ml-10 -mt-10">
                    Last used
                  </Badge>
                )}
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure authentication</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-neutral-400 hover:text-white underline underline-offset-2 transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;