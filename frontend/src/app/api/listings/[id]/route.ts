/**
 * Single listing API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/* ===================================================== */
/* GET SINGLE LISTING */
/* ===================================================== */

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
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

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    /**
     * Missing listing.
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

    return NextResponse.json(
      listing
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch listing",
      },
      {
        status: 500,
      }
    );
  }
}