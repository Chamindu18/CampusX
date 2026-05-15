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

    return NextResponse.json(
      report
    );
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