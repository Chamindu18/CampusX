/**
 * Authentication validation schemas.
 */

import { z } from "zod";

import {
  passwordSchema,
} from "./common";

/**
 * Login validation schema.
 */
export const loginSchema =
  z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(
        "Please enter a valid email"
      ),

    password:
      passwordSchema,
  });

/**
 * Signup validation schema.
 */
export const signupSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        2,
        "Name must be at least 2 characters"
      )
      .max(
        50,
        "Name is too long"
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(
        "Please enter a valid email"
      ),

    password:
      passwordSchema,
  });

/**
 * Type inference.
 */
export type LoginFormValues =
  z.infer<
    typeof loginSchema
  >;

export type SignupFormValues =
  z.infer<
    typeof signupSchema
  >;