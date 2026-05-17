/**
 * Current user dorm listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

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
     * Fetch dorms.
     */
    const dorms =
      await prisma.dorm.findMany({
        where: {
          userId:
            currentUser.id,
        },

        orderBy: {
          createdAt:
            "desc",
        },
      });

    return NextResponse.json({
      dorms,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch dorms",
      },
      {
        status: 500,
      }
    );
  }
}