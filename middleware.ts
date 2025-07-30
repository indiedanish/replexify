import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Add this debug logging
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("Path:", path);
  console.log("URL:", request.url);
  console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Cookie header:", request.headers.get("cookie"));
  console.log("All cookies:", request.cookies.getAll());
  console.log("========================");

  // // Check if the path starts with /dashboard
  // if (path.startsWith("/dashboard")) {
  //   // Check if user is authenticated (you can modify this based on your auth strategy)
  //   const isAuthenticated = checkAuthentication(request);

  //   console.log("request", request.cookies, request.cookies.get("AccessToken"));

  //   console.log("isAuthenticated", isAuthenticated);

  //   if (!isAuthenticated) {
  //     // Redirect to login page if not authenticated
  //     const loginUrl = new URL("/login", request.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}

// Function to check authentication status
function checkAuthentication(request: NextRequest): boolean {
  // Check for access token cookie - try both possible names
  const accessToken =
    request.cookies.get("AccessToken") || request.cookies.get("auth-token");

  console.log("accessToken", accessToken);
  console.log("All cookies:", request.cookies.getAll());

  // You can also check for other authentication methods here
  // For example, check for a session token, JWT token, etc.

  return !!accessToken;
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
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
