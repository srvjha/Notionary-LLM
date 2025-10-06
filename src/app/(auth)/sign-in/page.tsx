"use client";
import { signIn } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Github } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

const SignIn = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
      toast.success("Login successful! Redirecting...");
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 ">
      <div className="flex flex-col items-center gap-8">
         <Link href="/" className="text-3xl cursor-pointer text-neutral-400">Notionary LLM.</Link>
      <Card className="w-full max-w-md bg-neutral-950 shadow-md shadow-neutral-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-bold ">
            Sign in with Notionary LLM
          </CardTitle>
          <CardDescription>
            Continue securely using your preferred account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full shadow-xs shadow-neutral-700 cursor-pointer"
            onClick={() => handleSignIn("github")}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full shadow-xs shadow-neutral-700 cursor-pointer"
            onClick={() => handleSignIn("google")}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          
        </CardContent>
      </Card>
      </div>
     
    </div>
  );
};

export default SignIn;
