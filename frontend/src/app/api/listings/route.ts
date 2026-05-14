/**
 * Marketplace listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/**
 * GET all listings.
 */
export async function GET() {
  try {
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

/**
 * CREATE new listing.
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
     * Parse body.
     */
    const body =
      await request.json();

    const {
      title,
      description,
      category,
      price,
    } = body;

    /**
     * Create listing.
     */
    const listing =
      await prisma.listing.create({
        data: {
          title,

          description,

          category,

          price:
            Number(price),

          condition:
            "Used - Good",

          location:
            currentUser.university ||
            "Campus Community",

          userId:
            currentUser.id,
        },
      });

    return NextResponse.json(
      listing
    );
  } catch (error) {
    console.error(error);

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