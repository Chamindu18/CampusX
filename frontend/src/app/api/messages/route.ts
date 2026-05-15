/**
 * Messages API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/**
 * Get messages.
 */
export async function GET(
  request: Request
) {
  try {
    const {
      searchParams,
    } = new URL(request.url);

    const conversationId =
      searchParams.get(
        "conversationId"
      );

    if (!conversationId) {
      return NextResponse.json(
        [],
        {
          status: 200,
        }
      );
    }

    const messages =
      await prisma.message.findMany({
        where: {
          conversationId,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    return NextResponse.json(
      messages
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * Create message.
 */
export async function POST(
  request: Request
) {
  try {
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

    const body =
      await request.json();

    const {
      content,
      conversationId,
    } = body;

    /**
     * Save database message.
     */
    const message =
      await prisma.message.create({
        data: {
          content,

          conversationId,

          userId:
            currentUser.id,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

    return NextResponse.json(
      message
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create message",
      },
      {
        status: 500,
      }
    );
  }
}