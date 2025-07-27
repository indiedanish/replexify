import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  // ...component code...
}

// Function to check authentication status
function checkAuthentication(request: NextRequest): boolean {
  // Check for access token cookie
  const accessToken = request.cookies.get('AccessToken')

  // You can also check for other authentication methods here
  // For example, check for a session token, JWT token, etc.

  return !!accessToken
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}