/**
 * Get authenticated user from JWT cookie.
 */

import { cookies } from "next/headers";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import {
  AUTH_COOKIE_NAME,
  verifyToken,
} from "@/lib/auth";

const currentUserSelect = {
  id: true,
  name: true,
  email: true,
  university: true,
  bio: true,
  createdAt: true,
  role: true,
} satisfies Prisma.UserSelect;

/**
 * Get current authenticated user.
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);

    if (!payload) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },

      select: currentUserSelect,
    });

    return user;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export type CurrentUser = Awaited<
  ReturnType<typeof getCurrentUser>
>;