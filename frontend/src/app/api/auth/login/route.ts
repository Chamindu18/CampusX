/**
 * Login API route.
 */

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { createToken } from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    /**
     * Parse body.
     */
    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    /**
     * Find user.
     */
    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    /**
     * Invalid credentials.
     */
    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Compare passwords.
     */
    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    /**
     * Create token.
     */
    const token =
      createToken({
        userId: user.id,
        email: user.email,
      });

    /**
     * Create response.
     */
    const response =
      NextResponse.json({
        success: true,
      });

    /**
     * Set cookie.
     */
    response.cookies.set(
      "campusx_token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return response;
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