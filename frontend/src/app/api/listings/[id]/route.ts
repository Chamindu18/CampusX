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

/* ===================================================== */
/* UPDATE LISTING */
/* ===================================================== */

import { listingSchema } from "@/lib/validations/listing";

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    /**
     * Validate input with Zod schema (partial update).
     */
    const parsed = listingSchema.partial().safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid listing data",
        },
        {
          status: 400,
        }
      );
    }

    const listing = await prisma.listing.findUnique({ where: { id } });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.userId !== currentUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      title,
      description,
      price,
      category,
    } = parsed.data;

    const { imageUrls } = body;

    /**
     * Validate imageUrls if provided.
     */
    if (
      imageUrls !== undefined &&
      (!Array.isArray(imageUrls) ||
        !imageUrls.every((url) => typeof url === "string"))
    ) {
      return NextResponse.json(
        { error: "Invalid imageUrls format" },
        { status: 400 }
      );
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: {
        title: title ?? listing.title,
        description: description ?? listing.description,
        price: price !== undefined ? Number(price) : listing.price,
        category: category ?? listing.category,
        imageUrls: imageUrls ?? listing.imageUrls,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
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
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const listing = await prisma.listing.findUnique({ where: { id } });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.userId !== currentUser.id && currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.listing.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to delete listing" }, { status: 500 });
  }
}