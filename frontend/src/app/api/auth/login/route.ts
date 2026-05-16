/**
 * Login API route.
 */

import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  createToken,
  setAuthCookie,
} from "@/lib/auth";

import {
  loginSchema,
} from "@/lib/validations/auth";

/* ===================================================== */
/* LOGIN */
/* ===================================================== */

export async function POST(
  request: Request
) {
  try {
    /**
     * Parse body.
     */
    const body =
      await request.json();

    /**
     * Validate request.
     */
    const parsed =
      loginSchema.safeParse(
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
      email,
      password,
    } = parsed.data;

    /**
     * Find user.
     */
    const user =
      await prisma.user.findUnique(
        {
          where: {
            email,
          },

          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
          },
        }
      );

    /**
     * Prevent user enumeration.
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
     * Password validation.
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

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
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
      "LOGIN_ERROR",
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