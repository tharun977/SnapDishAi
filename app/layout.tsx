import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/components/auth/auth-context"
import { UserNav } from "@/components/auth/user-nav"
import { Toaster } from "@/components/ui/toaster"
import { getSessionSafely } from "@/lib/supabase/server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SnapDish AI - Your Personal Visual Chef",
  description: "Snap a dish, get the recipe. Your personal visual chef powered by AI.",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the session safely
  const { session } = await getSessionSafely()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                      SnapDish AI
                    </span>
                  </Link>
                  <nav className="flex items-center gap-6">
                    <Link
                      href="/"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/features"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 transition-colors hover:text-black dark:hover:text-white"
                    >
                      Features
                    </Link>
                    <ThemeToggle />
                    {session ? (
                      <UserNav user={session.user} />
                    ) : (
                      <Link
                        href="/signin"
                        className="rounded-full bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200"
                      >
                        Sign In
                      </Link>
                    )}
                  </nav>
                </div>
              </header>
              <main className="flex-1 pt-16">{children}</main>
              <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                      <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                          SnapDish AI
                        </span>
                      </Link>
                      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                        Your personal visual chef powered by AI. Snap a dish, get the recipe.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black dark:text-white">Product</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <Link
                            href="/features"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Features
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/pricing"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Pricing
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/api"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            API
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black dark:text-white">Resources</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <Link
                            href="/docs"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Documentation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/guides"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Guides
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/support"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Support
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black dark:text-white">Company</h3>
                      <ul className="mt-4 space-y-2">
                        <li>
                          <Link
                            href="/about"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/careers"
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                          >
                            Careers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
                    <p>© {new Date().getFullYear()} SnapDish AI. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
