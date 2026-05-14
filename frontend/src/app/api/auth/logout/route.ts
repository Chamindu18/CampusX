/**
 * Logout API route.
 */

import { NextResponse } from "next/server";

export async function POST() {
  /**
   * Create response.
   */
  const response =
    NextResponse.json({
      success: true,
    });

  /**
   * Remove auth cookie.
   */
  response.cookies.set(
    "campusx_token",
    "",
    {
      expires: new Date(0),
      path: "/",
    }
  );

  return response;
}