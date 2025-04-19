import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // This can happen when attempting to set cookies in a middleware
          // We can safely ignore this error
        }
      },
      remove(name: string, options: { path: string; domain?: string }) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch (error) {
          // This can happen when attempting to delete cookies in a middleware
          // We can safely ignore this error
        }
      },
    },
  })
}
