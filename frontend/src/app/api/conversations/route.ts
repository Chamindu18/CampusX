/**
 * User conversations API.
 */

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/current-user";

/* ===================================================== */
/* GET USER CONVERSATIONS */
/* ===================================================== */

export async function GET() {
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

    /**
     * Find user conversations.
     */
    const conversations =
      await prisma.conversation.findMany(
        {
          where: {
            participants: {
              some: {
                userId:
                  currentUser.id,
              },
            },
          },

          include: {
            participants: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },

            messages: {
              orderBy: {
                createdAt:
                  "desc",
              },

              take: 1,
            },
          },

          orderBy: {
            updatedAt:
              "desc",
          },
        }
      );

    return NextResponse.json(
      conversations
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch conversations",
      },
      {
        status: 500,
      }
    );
  }
}

/* ===================================================== */
/* CREATE PRIVATE DM */
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

    const { targetUserId } =
      body;

    if (
      !targetUserId ||
      targetUserId ===
        currentUser.id
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid user",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Existing DM check.
     */
    const existingConversations =
      await prisma.conversation.findMany(
        {
          where: {
            isPrivate: true,

            participants: {
              every: {
                userId: {
                  in: [
                    currentUser.id,
                    targetUserId,
                  ],
                },
              },
            },
          },

          include: {
            participants: true,
          },
        }
      );

    /**
     * Find exact 2-user DM.
     */
    const existingDM =
      existingConversations.find(
        (conversation) =>
          conversation
            .participants
            .length === 2
      );

    if (existingDM) {
      return NextResponse.json(
        existingDM
      );
    }

    /**
     * Create conversation.
     */
    const conversation =
      await prisma.conversation.create(
        {
          data: {
            isPrivate: true,

            participants: {
              create: [
                {
                  userId:
                    currentUser.id,
                },

                {
                  userId:
                    targetUserId,
                },
              ],
            },
          },

          include: {
            participants: true,
          },
        }
      );

    return NextResponse.json(
      conversation
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create conversation",
      },
      {
        status: 500,
      }
    );
  }
}