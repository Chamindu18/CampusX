import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* RESOLVE REPORT */
/* ===================================================== */

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const currentUser =
      await getCurrentUser();

    /**
     * Unauthorized.
     */
    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Forbidden.
     */
    if (
      currentUser.role !==
      "ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const resolvedParams =
      await params;

    /**
     * Update report.
     */
    const report =
      await prisma.report.update({
        where: {
          id: resolvedParams.id,
        },

        data: {
          status:
            "RESOLVED",
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
          "Failed to resolve report",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* REMOVE REPORTED LISTING */
/* ===================================================== */

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const currentUser =
      await getCurrentUser();

    /**
     * Unauthorized.
     */
    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Forbidden.
     */
    if (
      currentUser.role !==
      "ADMIN"
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const resolvedParams =
      await params;

    /**
     * Find report.
     */
    const report =
      await prisma.report.findUnique({
        where: {
          id: resolvedParams.id,
        },
      });

    /**
     * Missing report.
     */
    if (!report) {
      return NextResponse.json(
        {
          error:
            "Report not found",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Delete saved listing references first.
     */
    await prisma.savedListing.deleteMany({
      where: {
        listingId:
          report.listingId,
      },
    });

    /**
     * Delete report references.
     */
    await prisma.report.deleteMany({
      where: {
        listingId:
          report.listingId,
      },
    });

    /**
     * Delete listing.
     */
    await prisma.listing.delete({
      where: {
        id: report.listingId,
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
          "Failed to remove listing",
      },
      {
        status: 500,
      }
    );
  }
}