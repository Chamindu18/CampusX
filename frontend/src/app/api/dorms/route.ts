/**
 * Dorm listings API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  dormSchema,
} from "@/lib/validations/dorm";

/* ===================================================== */
/* CREATE DORM */
/* ===================================================== */

export async function POST(
  request: Request
) {
  try {
    /**
     * Authenticated user.
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
     * Request body.
     */
    const body =
      await request.json();

    /**
     * Validate body.
     */
    const parsed =
      dormSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]
              ?.message ||
            "Invalid dorm data",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Parsed values.
     */
    const {
      title,
      description,
      university,
      city,
      gender,
      roomType,
      price,
      facilities,
      imageUrls,
      contactNumber,
      distanceFromUniversity,
    } = parsed.data;

    /**
     * Create dorm.
     */
    const dorm =
      await prisma.dorm.create({
        data: {
          title,

          description,

          university,

          city,

          gender,

          roomType,

          price,

          facilities,

          imageUrls,

          contactNumber,

          distanceFromUniversity,

          userId:
            currentUser.id,
        },
      });

    return NextResponse.json(
      dorm
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create dorm",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* GET DORMS */
/* ===================================================== */

export async function GET(
  request: Request
) {
  try {
    const {
      searchParams,
    } = new URL(
      request.url
    );

    /**
     * Filters.
     */
    const university =
      searchParams.get(
        "university"
      );

    const city =
      searchParams.get(
        "city"
      );

    const gender =
      searchParams.get(
        "gender"
      );

    /**
     * Query dorms.
     */
    const dorms =
      await prisma.dorm.findMany(
        {
          where: {
            ...(university && {
              university,
            }),

            ...(city && {
              city,
            }),

            ...(gender && {
              gender,
            }),
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

          orderBy: {
            createdAt:
              "desc",
          },
        }
      );

    return NextResponse.json({
      dorms,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch dorms",
      },
      {
        status: 500,
      }
    );
  }
}