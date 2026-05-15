/**
 * Notifications API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET NOTIFICATIONS */
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
        [],
        {
          status: 200,
        }
      );
    }

    /**
     * Fetch notifications.
     */
    const notifications =
      await prisma.notification.findMany({
        where: {
          userId:
            currentUser.id,
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 20,
      });

    return NextResponse.json(
      notifications
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch notifications",
      },
      {
        status: 500,
      }
    );
  }
}