/**
 * Get authenticated user from JWT cookie.
 */

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

import { verifyToken } from "@/lib/auth";

/**
 * Get current authenticated user.
 */
export async function getCurrentUser() {
  try {
    /**
     * Read auth cookie.
     */
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "campusx_token"
      )?.value;

    /**
     * No token.
     */
    if (!token) {
      return null;
    }

    /**
     * Verify JWT.
     */
    const payload =
      verifyToken(token);

    if (!payload) {
      return null;
    }

    /**
     * Find database user.
     */
    const user =
      await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },

        select: {
          id: true,
          name: true,
          email: true,
          university: true,
          bio: true,
          createdAt: true,
        },
      });

    return user;
  } catch (error) {
    console.error(error);

    return null;
  }
}