/**
 * Reports API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* CREATE REPORT */
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
     * Parse body.
     */
    const body =
      await request.json();

    const {
      listingId,
      reason,
      description,
    } = body;

    /**
     * Validation.
     */
    if (
      !listingId ||
      !reason
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
     * Ensure listing exists.
     */
    const targetListing =
      await prisma.listing.findUnique({
        where: { id: listingId },
        select: { id: true, userId: true, title: true },
      });

    if (!targetListing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }
    /**
     * Create report.
     */
    const report =
      await prisma.report.create({
        data: {
          reason,

          description,

          listingId,

          reporterId:
            currentUser.id,
        },
      });

    /**
     * Notify listing owner about the report.
     */
    try {
      await prisma.notification.create({
        data: {
          title: `Listing reported: ${targetListing.title}`,
          message: `Your listing was reported for: ${reason}`,
          link: `/marketplace/${targetListing.id}`,
          userId: targetListing.userId,
        },
      });
    } catch (err) {
      console.error("Failed to create notification", err);
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create report",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* GET REPORTS */
/* ===================================================== */

export async function GET() {
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

    if (currentUser.role !== "ADMIN") {
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
     * Fetch reports.
     */
    const reports =
      await prisma.report.findMany({
        include: {
          reporter: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          listing: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      reports
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch reports",
      },
      {
        status: 500,
      }
    );
  }
}