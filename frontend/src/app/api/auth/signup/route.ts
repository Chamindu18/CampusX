/**
 * Signup API route.
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
     * Parse request body.
     */
    const body =
      await request.json();

    const {
      name,
      email,
      password,
    } = body;

    /**
     * Check existing user.
     */
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Hash password.
     */
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /**
     * Create user.
     */
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password:
            hashedPassword,
        },
      });

    /**
     * Create token.
     */
    const token =
      createToken({
        userId: user.id,
        email: user.email,
      });

    /**
     * Response.
     */
    const response =
      NextResponse.json({
        success: true,
      });

    /**
     * Set auth cookie.
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