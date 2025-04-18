import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SnapDish AI - Your Personal Visual Chef",
  description: "Snap a dish, get the recipe. Your personal visual chef powered by AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-black text-white antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-neutral-800 bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    SnapDish AI
                  </span>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    Home
                  </Link>
                  <Link href="#" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    About
                  </Link>
                  <Link href="#" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                    Contact
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                  >
                    Sign In
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1 pt-16">{children}</main>
            <footer className="border-t border-neutral-800 py-8 bg-black">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                  <div>
                    <Link href="/" className="flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        SnapDish AI
                      </span>
                    </Link>
                    <p className="mt-4 text-sm text-neutral-400">
                      Your personal visual chef powered by AI. Snap a dish, get the recipe.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Product</h3>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          API
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Resources</h3>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Documentation
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Guides
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Support
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Company</h3>
                    <ul className="mt-4 space-y-2">
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
                  <p>© {new Date().getFullYear()} SnapDish AI. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
