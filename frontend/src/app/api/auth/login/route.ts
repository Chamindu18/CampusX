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

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
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
    });

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

    const passwordMatch = await bcrypt.compare(
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

    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setAuthCookie(response, token);

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