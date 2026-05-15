/**
 * Route protection middleware.
 *
 * Validates JWT tokens from httpOnly cookies and enforces:
 * - Protected route access (redirect to login if missing token)
 * - Admin route access (redirect to dashboard if not ADMIN role)
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth-shared";
import { verifyEdgeToken } from "@/lib/auth-edge";

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const protectedRoutes = [
    "/dashboard",
    "/marketplace",
    "/messages",
    "/profile",
    "/create-listing",
    "/saved",
    "/settings",
    "/notifications",
    "/admin",
  ];

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow unauthenticated access to public routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return buildLoginRedirect(request);
  }

  // Verify token in Edge runtime
  const payload = await verifyEdgeToken(token);
  if (!payload) {
    // Token is invalid or expired
    return buildLoginRedirect(request);
  }

  // Enforce admin-only routes
  if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/saved/:path*",
    "/settings/:path*",
    "/notifications/:path*",
    "/admin/:path*",
  ],
};