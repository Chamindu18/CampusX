/**
 * Route protection middleware.
 */

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  /**
   * Get auth token.
   */
  const token =
    request.cookies.get(
      "campusx_token"
    );

  /**
   * Protected routes.
   */
  const protectedRoutes = [
    "/dashboard",
    "/marketplace",
    "/messages",
    "/profile",
    "/create-listing",
  ];

  const isProtectedRoute =
    protectedRoutes.some(
      (route) =>
        request.nextUrl.pathname.startsWith(
          route
        )
    );

  /**
   * Redirect unauthenticated users.
   */
  if (
    isProtectedRoute &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

/**
 * Middleware matcher.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/marketplace/:path*",
    "/messages/:path*",
    "/profile/:path*",
    "/create-listing/:path*",
  ],
};