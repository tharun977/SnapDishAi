"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-context"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const { signOut } = useAuth()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut()}
      className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  )
}
