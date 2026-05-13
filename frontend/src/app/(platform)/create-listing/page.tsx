"use client";

/**
 * Create marketplace listing page.
 */

import { motion } from "framer-motion";

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
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function CreateListingPage() {
  /**
   * Form setup.
   */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
  });

  /**
   * Submit handler.
   */
  async function onSubmit(
    data: ListingFormValues
  ) {
    console.log(data);

    /**
     * Simulated request.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    toast.success("Listing created");
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
        duration: 0.6,
      }}
      className="mx-auto max-w-4xl"
    >
      {/* Heading */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Create Listing
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Publish a new marketplace listing for
          your campus community.
        </p>
      </div>

      {/* Form */}
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
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Title */}
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
              message={errors.title?.message}
            />
          </div>

          {/* Category */}
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
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
              {...register("category")}
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

              <option value="Gaming">
                Gaming
              </option>

              <option value="Furniture">
                Furniture
              </option>
            </select>

            <FormError
              message={errors.category?.message}
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">
              Price
            </Label>

            <Input
              id="price"
              placeholder="LKR 50,000"
              className="mt-2"
              {...register("price")}
            />

            <FormError
              message={errors.price?.message}
            />
          </div>

          {/* Description */}
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
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
              {...register("description")}
            />

            <FormError
              message={
                errors.description?.message
              }
            />
          </div>

          {/* Upload Area */}
          <div>
            <Label>
              Upload Images
            </Label>

            <div
              className="
                mt-3
                flex
                h-52
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-slate-300
                bg-slate-50
                text-center
              "
            >
              <div>
                <p className="font-medium text-slate-700">
                  Drag and drop images here
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Publishing..."
                : "Publish Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}