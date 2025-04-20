import { createBrowserClient } from "@supabase/ssr"

// Declare supabase client variable with proper type
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

// Function to initialize Supabase client only once
export function createClientSupabaseClient() {
  // Check if client already exists to avoid re-initializing it
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!, // Ensure this is set in your .env.local
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Ensure this is set in your .env.local
    )
  }
  return supabaseClient
}
