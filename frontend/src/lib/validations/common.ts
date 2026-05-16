/**
 * Shared validation utilities.
 */

import { z } from "zod";

/**
 * Sanitized text field.
 */
export const safeText =
  z
    .string()
    .trim()
    .min(1)
    .max(5000);

/**
 * Safe optional text.
 */
export const optionalSafeText =
  z
    .string()
    .trim()
    .max(5000)
    .optional();

/**
 * Strong password.
 */
export const passwordSchema =
  z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .max(
      100,
      "Password is too long"
    )
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain letters and numbers"
    );

/**
 * Safe price validation.
 */
export const priceSchema =
  z.coerce
    .number()
    .positive(
      "Price must be positive"
    )
    .max(
      1000000,
      "Price is too high"
    );