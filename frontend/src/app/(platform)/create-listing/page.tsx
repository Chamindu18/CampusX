"use client";

/**
 * Create marketplace listing page.
 */

import { useState } from "react";

import { motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  listingSchema,
  type ListingFormValues,
} from "@/lib/validations/listing";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { FormError } from "@/components/ui/FormError";

import { ImageUpload } from "@/components/ui/ImageUpload";

import { Input } from "@/components/ui/Input";

import { Label } from "@/components/ui/Label";

export default function CreateListingPage() {
  /**
   * Router.
   */
  const router = useRouter();

  /**
   * Uploaded images.
   */
  const [
    imageUrls,
    setImageUrls,
  ] = useState<string[]>([]);

  /**
   * Upload state.
   */
  const [
    uploading,
    setUploading,
  ] = useState(false);

  /**
   * React Hook Form.
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(
      listingSchema
    ),
  });

  /**
   * Submit listing.
   */
  async function onSubmit(
    data: ListingFormValues
  ) {
    try {
      /**
       * Require image.
       */
      if (
        imageUrls.length === 0
      ) {
        toast.error(
          "Please upload at least one image"
        );

        return;
      }

      /**
       * API request.
       */
      const response =
        await fetch(
          "/api/listings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...data,

              imageUrls,
            }),
          }
        );

      const result =
        await response.json();

      /**
       * Backend error.
       */
      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to create listing"
        );

        return;
      }

      /**
       * Success.
       */
      toast.success(
        "Listing published"
      );

      /**
       * Reset state.
       */
      reset();

      setImageUrls([]);

      /**
       * Redirect.
       */
      router.push(
        "/marketplace"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="mx-auto max-w-4xl"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Create Listing
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Publish an item to the
          campus marketplace.
        </p>
      </div>

      {/* FORM */}
      <Card
        className="
          mt-12
          border-white/40
          bg-white/70
          p-10
          backdrop-blur-xl
        "
      >
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-8"
        >
          {/* TITLE */}
          <div>
            <Label htmlFor="title">
              Listing Title
            </Label>

            <Input
              id="title"
              placeholder="MacBook Air M1"
              className="mt-2"
              {...register("title")}
            />

            <FormError
              message={
                errors.title?.message
              }
            />
          </div>

          {/* CATEGORY */}
          <div>
            <Label htmlFor="category">
              Category
            </Label>

            <select
              id="category"
              className="
                mt-2
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white/80
                px-4
                text-sm
                outline-none
              "
              {...register(
                "category"
              )}
            >
              <option value="">
                Select category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Books">
                Books
              </option>

              <option value="Furniture">
                Furniture
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <FormError
              message={
                errors.category
                  ?.message
              }
            />
          </div>

          {/* PRICE */}
          <div>
            <Label htmlFor="price">
              Price
            </Label>

            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="250"
              className="mt-2"
              {...register(
                "price"
              )}
            />

            <FormError
              message={
                errors.price
                  ?.message
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="description">
              Description
            </Label>

            <textarea
              id="description"
              rows={6}
              placeholder="Describe your item..."
              className="
                mt-2
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white/80
                px-4
                py-4
                text-sm
                outline-none
              "
              {...register(
                "description"
              )}
            />

            <FormError
              message={
                errors
                  .description
                  ?.message
              }
            />
          </div>

          {/* IMAGES */}
          <div>
            <Label>
              Listing Images
            </Label>

            <div className="mt-4">
              <ImageUpload
                value={
                  imageUrls
                }
                disabled={
                  uploading
                }
                onChange={(
                  urls
                ) =>
                  setImageUrls(
                    urls
                  )
                }
                onUploadStart={() =>
                  setUploading(
                    true
                  )
                }
                onUploadComplete={() =>
                  setUploading(
                    false
                  )
                }
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Max 5 images • 4MB
              each
            </p>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            size="lg"
            disabled={
              isSubmitting ||
              uploading
            }
            className="w-full"
          >
            {uploading
              ? "Uploading images..."
              : isSubmitting
              ? "Publishing..."
              : "Publish Listing"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}