import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies(); // ✅ await it!

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Your project's URL and Key are required to create a Supabase client!")
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: cookieStore,
    auth: {
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })
}
