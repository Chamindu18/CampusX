/**
 * Current authenticated user API.
 */

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
    const user =
      await getCurrentUser();

    /**
     * Unauthorized.
     */
    if (!user) {
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

    return NextResponse.json(
      user
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}