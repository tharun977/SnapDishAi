import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createServerSupabaseClient = async () => {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Your project's URL and Key are required to create a Supabase client!")
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting error
          console.error("Error setting cookie:", error)
        }
      },
      remove(name: string, options: { path: string; domain?: string }) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch (error) {
          // Handle cookie removal error
          console.error("Error removing cookie:", error)
        }
      },
    },
    auth: {
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })
}

// Helper function to get session safely
export const getSessionSafely = async () => {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session:", error)
      return { session: null, user: null }
    }

    return {
      session: data.session,
      user: data.session?.user || null,
    }
  } catch (error) {
    console.error("Error in getSessionSafely:", error)
    return { session: null, user: null }
  }
}
