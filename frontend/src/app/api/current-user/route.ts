/**
 * Current authenticated user API.
 */

import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
    const currentUser =
      await getCurrentUser();

    return NextResponse.json(
      currentUser
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}