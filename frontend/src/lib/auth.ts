/**
 * Authentication utilities.
 */

import type {
  Role,
} from "@prisma/client";

import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  getLandingPathForRole,
  getSafeRedirectPath,
} from "@/lib/auth-shared";

/* ===================================================== */
/* ENV */
/* ===================================================== */

const JWT_SECRET =
  process.env.JWT_SECRET;

function getJwtSecret() {
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured"
    );
  }

  return JWT_SECRET;
}

/* ===================================================== */
/* TOKEN PAYLOAD */
/* ===================================================== */

export interface TokenPayload {
  userId: string;

  email: string;

  role: Role;
}

/* ===================================================== */
/* TOKEN HELPERS */
/* ===================================================== */

/**
 * Create signed JWT token.
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
 * Verify JWT token safely.
 */
export function verifyToken(
  token: string
): TokenPayload | null {
  try {
    return jwt.verify(
      token,
      getJwtSecret()
    ) as TokenPayload;
  } catch {
    return null;
  }
}

/* ===================================================== */
/* COOKIE CONFIG */
/* ===================================================== */

export const AUTH_COOKIE_OPTIONS =
  {
    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite:
      "lax" as const,

    path: "/",

    maxAge:
      AUTH_COOKIE_MAX_AGE_SECONDS,
  };

/**
 * Set auth cookie.
 */
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

/**
 * Clear auth cookie.
 */
export function clearAuthCookie(
  response: NextResponse
) {
  response.cookies.set(
    AUTH_COOKIE_NAME,
    "",
    {
      ...AUTH_COOKIE_OPTIONS,

      expires:
        new Date(0),

      maxAge: 0,
    }
  );

  return response;
}

/* ===================================================== */
/* ROLE HELPERS */
/* ===================================================== */

/**
 * Admin role check.
 */
export function isAdmin(
  role?: Role
) {
  return role === "ADMIN";
}

/**
 * Authenticated role check.
 */
export function isUser(
  role?: Role
) {
  return role === "USER";
}

/* ===================================================== */
/* EXPORTS */
/* ===================================================== */

export {
  AUTH_COOKIE_NAME,
  getLandingPathForRole,
  getSafeRedirectPath,
};