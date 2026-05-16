/**
 * Mark all notifications as read.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

export async function PATCH() {
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
     * Update notifications.
     */
    await prisma.notification.updateMany(
      {
        where: {
          userId:
            currentUser.id,

          isRead: false,
        },

        data: {
          isRead: true,
        },
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update notifications",
      },
      {
        status: 500,
      }
    );
  }
}