/**
 * User profile API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET PROFILE */
/* ===================================================== */

export async function GET() {
  try {
    /**
     * Current user.
     */
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Fetch profile.
     */
    const user =
      await prisma.user.findUnique({
        where: {
          id:
            currentUser.id,
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

    return NextResponse.json(
      user
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch profile",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* UPDATE PROFILE */
/* ===================================================== */

import { z } from "zod";

const profileUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .optional(),
  university: z
    .string()
    .trim()
    .optional(),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
});

export async function PATCH(
  request: Request
) {
  try {
    /**
     * Current user.
     */
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Parse request.
     */
    const body =
      await request.json();

    /**
     * Validate input with Zod schema.
     */
    const parsed = profileUpdateSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid profile data",
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      university,
      bio,
    } = parsed.data;

    /**
     * Update user profile.
     */
    const updatedUser =
      await prisma.user.update({
        where: {
          id:
            currentUser.id,
        },

        data: {
          ...(name && { name }),
          ...(university && { university }),
          ...(bio && { bio }),
        },
      });

    return NextResponse.json(
      updatedUser
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
}