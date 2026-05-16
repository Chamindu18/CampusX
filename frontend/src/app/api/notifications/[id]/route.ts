/**
 * Single notification API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* MARK AS READ */
/* ===================================================== */

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
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
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Params.
     */
    const resolvedParams =
      await params;

    /**
     * Update notification.
     */
    const notification =
      await prisma.notification.update(
        {
          where: {
            id: resolvedParams.id,
          },

          data: {
            isRead: true,
          },
        }
      );

    return NextResponse.json(
      notification
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update notification",
      },
      {
        status: 500,
      }
    );
  }
}