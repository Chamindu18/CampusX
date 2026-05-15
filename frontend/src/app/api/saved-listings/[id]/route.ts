/**
 * Remove saved listing API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    /**
     * Authenticated user.
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
     * Dynamic route.
     */
    const { id } =
      await params;

    /**
     * Find saved listing.
     */
    const savedListing =
      await prisma.savedListing.findUnique({
        where: {
          id,
        },
      });

    /**
     * Missing saved listing.
     */
    if (!savedListing) {
      return NextResponse.json(
        {
          error:
            "Saved listing not found",
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
      savedListing.userId !==
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
     * Delete saved listing.
     */
    await prisma.savedListing.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to remove saved listing",
      },
      {
        status: 500,
      }
    );
  }
}