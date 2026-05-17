/**
 * Single dorm API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

import {
  dormSchema,
} from "@/lib/validations/dorm";

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
    const { id } =
      await params;

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

/* ===================================================== */
/* UPDATE DORM */
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
     * Existing dorm.
     */
    const existingDorm =
      await prisma.dorm.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!existingDorm) {
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

    /**
     * Ownership validation.
     */
    if (
      existingDorm.userId !==
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
     * Body.
     */
    const body =
      await request.json();

    /**
     * Validate.
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
     * Update dorm.
     */
    const updatedDorm =
      await prisma.dorm.update({
        where: {
          id,
        },

        data: parsed.data,
      });

    return NextResponse.json(
      updatedDorm
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to update dorm",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* DELETE DORM */
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
     * Existing dorm.
     */
    const existingDorm =
      await prisma.dorm.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!existingDorm) {
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

    /**
     * Ownership check.
     */
    if (
      existingDorm.userId !==
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
     * Delete dorm.
     */
    await prisma.dorm.delete({
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
          "Failed to delete dorm",
      },
      {
        status: 500,
      }
    );
  }
}