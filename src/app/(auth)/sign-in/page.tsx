"use client"
import { signIn } from "@/lib/auth-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome, Github, Globe } from "lucide-react"

const SignIn = () => {
  const handleSignIn = async (provider: "github" | "google") => {
    await signIn.social({
      provider,
      callbackURL: "/"
    })
  }

  return (
    <div className="flex items-center justify-center bg-transparent p-4">
      <Card className="w-full max-w-md  bg-neutral-100 border border-neutral-200 mt-32 shadow-md shadow-green-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-bold text-neutral-900">
            Sign in with Notionary LLM
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Continue securely using your preferred account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full shadow-xs shadow-neutral-500 text-neutral-900 dark:hover:bg-neutral-800 cursor-pointer"
            onClick={() => handleSignIn("github")}
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full shadow-xs shadow-neutral-500 text-neutral-900 dark:hover:bg-neutral-800 cursor-pointer"
            onClick={() => handleSignIn("google")}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center mt-3">
              <span className="w-full border-t border-neutral-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-neutral-50 px-2 text-neutral-500">
                Secure authentication
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignIn
