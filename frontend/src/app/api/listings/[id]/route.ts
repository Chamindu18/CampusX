/**
 * Single listing API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * DELETE listing.
 */
export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    /**
     * Current user.
     */
    const currentUser =
      await getCurrentUser();

    /**
     * Unauthorized.
     */
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
     * Dynamic route params.
     */
    const { id } =
      await params;

    /**
     * Find listing.
     */
    const listing =
      await prisma.listing.findUnique({
        where: {
          id,
        },
      });

    /**
     * Listing not found.
     */
    if (!listing) {
      return NextResponse.json(
        {
          error:
            "Listing not found",
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
      listing.userId !==
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
     * Delete listing.
     */
    await prisma.listing.delete({
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
          "Failed to delete listing",
      },
      {
        status: 500,
      }
    );
  }
}