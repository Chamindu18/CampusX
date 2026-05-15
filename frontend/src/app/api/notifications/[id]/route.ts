/**
 * Mark notification as read.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteParams
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
     * Dynamic params.
     */
    const { id } =
      await params;

    /**
     * Find notification.
     */
    const notification =
      await prisma.notification.findUnique({
        where: {
          id,
        },
      });

    if (!notification) {
      return NextResponse.json(
        {
          error:
            "Notification not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Ownership validation.
     */
    if (
      notification.userId !==
      currentUser.id
    ) {
      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    /**
     * Mark as read.
     */
    const updated =
      await prisma.notification.update({
        where: {
          id,
        },

        data: {
          isRead: true,
        },
      });

    return NextResponse.json(
      updated
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