/**
 * Saved listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET SAVED LISTINGS */
/* ===================================================== */

export async function GET() {
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
     * Fetch saved listings.
     */
    const savedListings =
      await prisma.savedListing.findMany({
        where: {
          userId:
            currentUser.id,
        },

        include: {
          listing: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },

        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json(
      savedListings
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch saved listings",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* SAVE LISTING */
/* ===================================================== */

export async function POST(
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

    const {
      listingId,
    } = body;

    /**
     * Check duplicate.
     */
    const existing =
      await prisma.savedListing.findUnique({
        where: {
          userId_listingId: {
            userId:
              currentUser.id,

            listingId,
          },
        },
      });

    /**
     * Already saved.
     */
    if (existing) {
      return NextResponse.json(
        {
          error:
            "Listing already saved",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Save listing.
     */
    const savedListing =
      await prisma.savedListing.create({
        data: {
          userId:
            currentUser.id,

          listingId,
        },
      });

    return NextResponse.json(
      savedListing
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save listing",
      },
      {
        status: 500,
      }
    );
  }
}