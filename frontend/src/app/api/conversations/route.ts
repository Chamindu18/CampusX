/**
 * Conversations API.
 */

import { NextResponse } from "next/server";

export async function GET() {
  try {
    /**
     * Mock conversations.
     *
     * Realtime/private chat system
     * will later replace this.
     */
    const conversations = [
      {
        id: "global-campus-chat",

        title:
          "Global Campus Chat",

        description:
          "Public student discussion space.",
      },

      {
        id: "marketplace-chat",

        title:
          "Marketplace Help",

        description:
          "Discuss listings and trades.",
      },

      {
        id: "tech-chat",

        title:
          "Tech Community",

        description:
          "Programming and technology discussions.",
      },
    ];

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