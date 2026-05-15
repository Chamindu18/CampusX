/**
 * Authentication validation schemas.
 */

import { z } from "zod";

/**
 * Login validation schema.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Signup validation schema.
 */
export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Type inference from schemas.
 */
export type LoginFormValues =
  z.infer<typeof loginSchema>;

export type SignupFormValues =
  z.infer<typeof signupSchema>;