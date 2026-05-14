/**
 * Marketplace listings API.
 *
 * Features:
 * - fetch all listings
 * - create new listings
 * - authenticated ownership
 * - image upload persistence
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/**
 * GET all marketplace listings.
 */
export async function GET() {
  try {
    /**
     * Fetch listings ordered newest first.
     */
    const listings =
      await prisma.listing.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      listings
    );
  } catch (error) {
    console.error(
      "GET_LISTINGS_ERROR",
      error
    );

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

/**
 * CREATE new marketplace listing.
 */
export async function POST(
  request: Request
) {
  try {
    /**
     * Current authenticated user.
     */
    const currentUser =
      await getCurrentUser();

    /**
     * Block unauthenticated users.
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
     * Parse request body.
     */
    const body =
      await request.json();

    const {
      title,
      description,
      category,
      price,
      imageUrls,
    } = body;

    /**
     * Basic backend validation.
     */
    if (
      !title ||
      !description ||
      !category ||
      !price
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create database listing.
     */
    const listing =
      await prisma.listing.create({
        data: {
          title,

          description,

          category,

          /**
           * Convert string price safely.
           */
          price:
            Number(price),

          /**
           * Cloud uploaded image URLs.
           */
          imageUrls:
            imageUrls || [],

          /**
           * Temporary default condition.
           */
          condition:
            "Used - Good",

          /**
           * Use user's university if available.
           */
          location:
            currentUser.university ||
            "Campus Community",

          /**
           * Ownership relation.
           */
          userId:
            currentUser.id,
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

    return NextResponse.json(
      listing
    );
  } catch (error) {
    console.error(
      "CREATE_LISTING_ERROR",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create listing",
      },
      {
        status: 500,
      }
    );
  }
}