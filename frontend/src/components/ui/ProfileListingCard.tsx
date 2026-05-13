"use client";

/**
 * User profile listing card.
 */

import { motion } from "framer-motion";

import {
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";

interface ProfileListingCardProps {
  title: string;
  price: string;
  status: string;
}

export function ProfileListingCard({
  title,
  price,
  status,
}: ProfileListingCardProps) {
  const isActive =
    status === "Active";

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
          <h3 className="text-2xl font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-3 text-lg font-semibold text-blue-600">
            {price}
          </p>
        </div>

        {/* Menu */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-slate-100
            text-slate-600
            transition
            hover:bg-slate-200
          "
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        {/* Status */}
        <div
          className={`
            rounded-full
            px-4
            py-2
            text-xs
            font-semibold

            ${
              isActive
                ? `
                  bg-emerald-100
                  text-emerald-700
                `
                : `
                  bg-slate-200
                  text-slate-700
                `
            }
          `}
        >
          {status}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
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

          <button
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
      </div>
    </motion.div>
  );
}