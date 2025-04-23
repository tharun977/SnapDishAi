import type { NextRequest } from "next/server"
import { updateSession } from "./utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  // Update the user's auth session
  const response = await updateSession(request)

  // Add CORS headers for API routes in development
  const { pathname } = request.nextUrl
  if (pathname.startsWith("/api/")) {
    // This helps with local development when using the browser's fetch API
    response.headers.append("Access-Control-Allow-Origin", "*")
    response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.append("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
