/**
 * Marketplace listings API.
 *
 * Features:
 * - search
 * - category filtering
 * - pagination
 * - optimized querying
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET LISTINGS */
/* ===================================================== */

export async function GET(
  request: Request
) {
  try {
    /**
     * URL params.
     */
    const {
      searchParams,
    } = new URL(request.url);

    /**
     * Search query.
     */
    const search =
      searchParams.get(
        "search"
      ) || "";

    /**
     * Category filter.
     */
    const category =
      searchParams.get(
        "category"
      ) || "";

    /**
     * Pagination.
     */
    const page = Number(
      searchParams.get("page") ||
        "1"
    );

    const limit = 9;

    const skip =
      (page - 1) * limit;

    /* ============================== */
    /* BUILD FILTERS */
    /* ============================== */

    const where: any = {};

    /**
     * Search filtering.
     */
    if (search) {
      where.OR = [
        {
          title: {
            contains:
              search,

            mode:
              "insensitive",
          },
        },

        {
          description: {
            contains:
              search,

            mode:
              "insensitive",
          },
        },
      ];
    }

    /**
     * Category filtering.
     */
    if (
      category &&
      category !== "All"
    ) {
      where.category =
        category;
    }

    /* ============================== */
    /* FETCH LISTINGS */
    /* ============================== */

    const listings =
      await prisma.listing.findMany({
        where,

        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limit,
      });

    /**
     * Total count.
     */
    const totalListings =
      await prisma.listing.count({
        where,
      });

    const totalPages =
      Math.ceil(
        totalListings / limit
      );

    return NextResponse.json({
      listings,

      pagination: {
        page,
        limit,
        totalListings,
        totalPages,
      },
    });
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

/* ===================================================== */
/* CREATE LISTING */
/* ===================================================== */

export async function POST(
  request: Request
) {
  try {
    /**
     * Current authenticated user.
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
     * Parse body.
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
     * Validation.
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

          imageUrls:
            imageUrls || [],

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