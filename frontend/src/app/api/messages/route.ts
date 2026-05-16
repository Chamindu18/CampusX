/**
 * Messages API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET MESSAGES */
/* ===================================================== */

export async function GET(
  request: Request
) {
  try {
    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        [],
        {
          status: 200,
        }
      );
    }

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

    /**
     * Ensure access.
     */
    const participant =
      await prisma.conversationParticipant.findFirst(
        {
          where: {
            conversationId,

            userId:
              currentUser.id,
          },
        }
      );

    if (!participant) {
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
     * Fetch messages.
     */
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

/* ===================================================== */
/* SEND MESSAGE */
/* ===================================================== */

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

    if (
      !content ||
      !conversationId
    ) {
      return NextResponse.json(
        {
          error:
            "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Ensure user belongs to conversation.
     */
    const participant =
      await prisma.conversationParticipant.findFirst(
        {
          where: {
            conversationId,

            userId:
              currentUser.id,
          },
        }
      );

    if (!participant) {
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
     * Create message.
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

    /**
     * Touch conversation timestamp.
     */
    await prisma.conversation.update(
      {
        where: {
          id: conversationId,
        },

        data: {
          updatedAt:
            new Date(),
        },
      }
    );

    return NextResponse.json(
      message
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to send message",
      },
      {
        status: 500,
      }
    );
  }
}