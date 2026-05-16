/**
 * Signup API route.
 */

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  createToken,
  setAuthCookie,
} from "@/lib/auth";

import {
  signupSchema,
} from "@/lib/validations/auth";

/* ===================================================== */
/* SIGNUP */
/* ===================================================== */

export async function POST(
  request: Request
) {
  try {
    /**
     * Parse request body.
     */
    const body =
      await request.json();

    /**
     * Validate request.
     */
    const parsed =
      signupSchema.safeParse(
        body
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]
              ?.message ||
            "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const {
      name,
      email,
      password,
    } = parsed.data;

    /**
     * Existing user check.
     */
    const existingUser =
      await prisma.user.findUnique(
        {
          where: {
            email,
          },

          select: {
            id: true,
          },
        }
      );

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Account already exists",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Secure password hashing.
     */
    const hashedPassword =
      await bcrypt.hash(
        password,
        12
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

          role: "USER",
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

    /**
     * Create JWT token.
     */
    const token =
      createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

    /**
     * Build response.
     */
    const response =
      NextResponse.json({
        success: true,

        user,
      });

    /**
     * Set secure auth cookie.
     */
    setAuthCookie(
      response,
      token
    );

    return response;
  } catch (error) {
    console.error(
      "SIGNUP_ERROR",
      error
    );

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