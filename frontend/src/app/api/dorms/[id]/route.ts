/**
 * Single dorm API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/* ===================================================== */
/* GET SINGLE DORM */
/* ===================================================== */

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    /**
     * Params.
     */
    const { id } =
      await params;

    /**
     * Fetch dorm.
     */
    const dorm =
      await prisma.dorm.findUnique(
        {
          where: {
            id,
          },

          include: {
            user: {
              select: {
                id: true,

                name: true,

                university: true,
              },
            },
          },
        }
      );

    /**
     * Not found.
     */
    if (!dorm) {
      return NextResponse.json(
        {
          error:
            "Dorm not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      dorm
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch dorm",
      },
      {
        status: 500,
      }
    );
  }
}