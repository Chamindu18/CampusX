"use client";

/**
 * Marketplace listing card.
 */

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface MarketplaceCardProps {
  title: string;
  category: string;
  price: string;
  condition: string;
  location: string;
  id: number;
}

export function MarketplaceCard({
  title,
  category,
  price,
  condition,
  location,
  id,
}: MarketplaceCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link href={`/marketplace/${id}`}>
        <Card
          className="
            group
            overflow-hidden
            border-white/40
            bg-white/70
            backdrop-blur-xl
            transition-all
            duration-300
            hover:shadow-2xl
          "
        >
          {/* Image Placeholder */}
          <div
            className="
              relative
              h-52
              overflow-hidden
              bg-gradient-to-br
              from-blue-100
              via-indigo-100
              to-cyan-100
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                transition
                duration-500
                group-hover:opacity-100
                bg-white/10
              "
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            <div
              className="
                inline-flex
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                font-medium
                text-blue-700
              "
            >
              {category}
            </div>

            {/* Title */}
            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              {title}
            </h3>

            {/* Meta */}
            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p>{condition}</p>

              <p>{location}</p>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">
              <span className="text-2xl font-black text-slate-900">
                {price}
              </span>

              <span
                className="
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                "
              >
                View
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}