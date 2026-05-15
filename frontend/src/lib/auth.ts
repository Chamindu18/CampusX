/**
 * Authentication utilities.
 */

import type { UserRole } from "@prisma/client";

import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  getLandingPathForRole,
  getSafeRedirectPath,
} from "@/lib/auth-shared";

const JWT_SECRET = process.env.JWT_SECRET;

function getJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured"
    );
  }

  return JWT_SECRET;
}

/**
 * JWT payload type.
 */
interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Create authentication token.
 */
export function createToken(
  payload: TokenPayload
) {
  return jwt.sign(
    payload,
    getJwtSecret(),
    {
      expiresIn:
        AUTH_COOKIE_MAX_AGE_SECONDS,
    }
  );
}

/**
 * Verify JWT token.
 */
export function verifyToken(
  token: string
) {
  try {
    return jwt.verify(
      token,
      getJwtSecret()
    ) as TokenPayload;
  } catch {
    return null;
  }
}

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure:
    process.env.NODE_ENV ===
    "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
};

export function setAuthCookie(
  response: NextResponse,
  token: string
) {
  response.cookies.set(
    AUTH_COOKIE_NAME,
    token,
    AUTH_COOKIE_OPTIONS
  );

  return response;
}

export function clearAuthCookie(
  response: NextResponse
) {
  response.cookies.set(
    AUTH_COOKIE_NAME,
    "",
    {
      ...AUTH_COOKIE_OPTIONS,
      expires: new Date(0),
      maxAge: 0,
    }
  );

  return response;
}

export {
  AUTH_COOKIE_NAME,
  getLandingPathForRole,
  getSafeRedirectPath,
};