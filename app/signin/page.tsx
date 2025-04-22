"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { signIn, signUp, signInWithGithub } = useAuth()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success!",
        description: "You have been signed in.",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await signUp(email, password)

      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Welcome back</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Sign in to your account to continue</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Sign In</CardTitle>
                <CardDescription>Enter your email and password to sign in</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Password
                      </label>
                      <Link href="#" className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="signup-email"
                      className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="signup-password"
                      className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neutral-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2 text-neutral-500">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={handleGithubSignIn}
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>

        <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          {`Don't have an account? `}
          <button
            type="button"
            className="text-purple-600 dark:text-purple-400 hover:underline"
            onClick={() => {
              const signupTab = document.querySelector('[data-value="signup"]') as HTMLElement | null;
              signupTab?.click();
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}
