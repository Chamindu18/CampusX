/**
 * Marketplace listings API.
 *
 * Features:
 * - search
 * - category filtering
 * - pagination
 * - validated creation
 * - optimized querying
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  listingSchema,
} from "@/lib/validations/listing";

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
      searchParams
        .get("search")
        ?.trim() || "";

    /**
     * Category filter.
     */
    const category =
      searchParams
        .get("category")
        ?.trim() || "";

    /**
     * Pagination.
     */
    const pageParam =
      Number(
        searchParams.get(
          "page"
        ) || "1"
      );

    const page =
      Number.isNaN(pageParam) ||
      pageParam < 1
        ? 1
        : pageParam;

    const limit = 9;

    const skip =
      (page - 1) * limit;

    /* ===================================================== */
    /* BUILD FILTERS */
    /* ===================================================== */

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

    /* ===================================================== */
    /* FETCH LISTINGS */
    /* ===================================================== */

    const listings =
      await prisma.listing.findMany({
        where,

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
     * Parse request body.
     */
    const body =
      await request.json();

    /**
     * Validate with Zod.
     */
    const parsed =
      listingSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]
              ?.message ||
            "Invalid listing data",
        },
        {
          status: 400,
        }
      );
    }

    const {
      title,
      description,
      category,
      price,
      imageUrls = [],
    } = parsed.data;

    /**
     * Create listing.
     */
    const listing =
      await prisma.listing.create({
        data: {
          title,

          description,

          category,

          price,

          imageUrls,

          condition:
            "Used - Good",

          location:
            currentUser.university ||
            "Campus Community",

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