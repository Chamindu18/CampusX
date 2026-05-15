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

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const parsed = signupSchema.safeParse(body);

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

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user,
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