import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: { path: string; domain?: string }) {
        request.cookies.set({
          name,
          value: "",
          ...options,
          maxAge: 0,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: "",
          ...options,
          maxAge: 0,
        })
      },
    },
    auth: {
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })

  // Refresh session if it exists
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error refreshing user session:", error)
      }
    }
  } catch (error) {
    console.error("Error in updateSession:", error)
  }

  return response
}
