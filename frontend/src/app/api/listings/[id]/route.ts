/**
 * Single listing API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  listingSchema,
} from "@/lib/validations/listing";

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
    const { id } =
      await params;

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

/* ===================================================== */
/* UPDATE LISTING */
/* ===================================================== */

export async function PATCH(
  request: Request,
  { params }: RouteParams
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
     * Params.
     */
    const { id } =
      await params;

    /**
     * Existing listing.
     */
    const existingListing =
      await prisma.listing.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!existingListing) {
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
     * Ownership check.
     */
    if (
      existingListing.userId !==
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
     * Parse body.
     */
    const body =
      await request.json();

    /**
     * Validate input.
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
     * Update listing.
     */
    const updatedListing =
      await prisma.listing.update({
        where: {
          id,
        },

        data: {
          title,

          description,

          category,

          price,

          imageUrls,
        },
      });

    return NextResponse.json(
      updatedListing
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update listing",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* DELETE LISTING */
/* ===================================================== */

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
     * Params.
     */
    const { id } =
      await params;

    /**
     * Existing listing.
     */
    const listing =
      await prisma.listing.findUnique(
        {
          where: {
            id,
          },
        }
      );

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