import { cookies, headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

// Create the Supabase client (used inside server components only)
export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies,
  });
};

// This is safe to call in server components to get the session
export const getSessionSafely = async () => {
  const supabase = createClient();
  const result = await supabase.auth.getSession();

  if (!result || !result.data || !result.data.session) {
    console.warn("⚠️ No session found");
    return null; // Or throw error / redirect logic if needed
  }

  return result.data.session;
};