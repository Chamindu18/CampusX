import { z } from "zod";

/**
 * Dorm validation schema.
 */
export const dormSchema =
  z.object({
    title: z
      .string()
      .min(
        5,
        "Title must be at least 5 characters"
      ),

    description: z
      .string()
      .min(
        20,
        "Description must be at least 20 characters"
      ),

    university: z
      .string()
      .min(
        2,
        "University is required"
      ),

    city: z
      .string()
      .min(
        2,
        "City is required"
      ),

    gender: z.string(),

    roomType: z.string(),

    price: z.coerce
      .number()
      .positive(
        "Price must be positive"
      ),

    facilities: z
      .array(z.string())
      .min(
        1,
        "Add at least one facility"
      ),

    imageUrls: z
      .array(z.string())
      .min(
        1,
        "Upload at least one image"
      ),

    contactNumber: z
      .string()
      .min(
        10,
        "Contact number is required"
      ),

    distanceFromUniversity:
      z
        .string()
        .min(
          2,
          "Distance is required"
        ),
  });

export type DormFormValues =
  z.infer<
    typeof dormSchema
  >;