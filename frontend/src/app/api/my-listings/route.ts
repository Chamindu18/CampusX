/**
 * Current user listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
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

    const listings =
      await prisma.listing.findMany({
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
      listings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch listings",
      },
      {
        status: 500,
      }
    );
  }
}