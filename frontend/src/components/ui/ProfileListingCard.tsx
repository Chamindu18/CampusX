"use client";

/**
 * User-owned listing card.
 */

import { motion } from "framer-motion";

import {
  Edit,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

interface ProfileListingCardProps {
  id: string;

  title: string;

  price: number;

  category: string;

  onDelete: (
    id: string
  ) => void;
}

export function ProfileListingCard({
  id,
  title,
  price,
  category,
  onDelete,
}: ProfileListingCardProps) {
  /**
   * Delete listing handler.
   */
  async function handleDelete() {
    try {
      /**
       * Delete request.
       */
      const response =
        await fetch(
          `/api/listings/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      /**
       * Handle errors.
       */
      if (!response.ok) {
        toast.error(
          result.error
        );

        return;
      }

      /**
       * Success state.
       */
      toast.success(
        "Listing deleted"
      );

      /**
       * Refresh parent state.
       */
      onDelete(id);
    } catch (error) {
      console.error(error);

      toast.error(
        "Delete failed"
      );
    }
  }

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-6
        shadow-lg
        shadow-slate-200/30
        backdrop-blur-xl
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div>
          <div
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-xs
              font-semibold
              text-blue-700
            "
          >
            {category}
          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-3 text-lg font-semibold text-blue-600">
            LKR{" "}
            {price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-end gap-3">
        {/* Edit */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
            transition
            hover:bg-blue-200
          "
        >
          <Edit className="h-5 w-5" />
        </button>

        {/* Delete */}
        <button
          onClick={
            handleDelete
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-red-100
            text-red-600
            transition
            hover:bg-red-200
          "
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}