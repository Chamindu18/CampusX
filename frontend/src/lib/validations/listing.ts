/**
 * Marketplace listing validation.
 */

import { z } from "zod";

export const listingSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short"),

  category: z
    .string()
    .min(1, "Category is required"),

  price: z
    .string()
    .min(1, "Price is required"),

  description: z
    .string()
    .min(
      20,
      "Description must be at least 20 characters"
    ),
});

export type ListingFormValues =
  z.infer<typeof listingSchema>;