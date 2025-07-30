import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path starts with /dashboard
  if (path.startsWith('/dashboard')) {
    // Check if user is authenticated (you can modify this based on your auth strategy)
    const isAuthenticated = checkAuthentication(request)
    
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Function to check authentication status
function checkAuthentication(request: NextRequest): boolean {
  // Check for access token cookie
  const accessToken = request.cookies.get('AccessToken')

  console.log('accessToken', accessToken)
  
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
