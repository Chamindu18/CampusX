/**
 * Utility helper for safely combining Tailwind classes.
 *
 * Why this exists:
 * Tailwind classes can conflict.
 *
 * Example:
 * "p-4 p-8"
 *
 * tailwind-merge resolves these conflicts correctly.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Safely merges Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}