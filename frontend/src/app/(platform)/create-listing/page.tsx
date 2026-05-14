"use client";

/**
 * Marketplace listing card.
 *
 * Features:
 * - dynamic listing routing
 * - cloud image support
 * - hover animations
 * - responsive design
 * - fallback image states
 */

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import { MapPin } from "lucide-react";

import { Card } from "@/components/ui/Card";

interface MarketplaceCardProps {
  id: string;

  title: string;

  category: string;

  price: number;

  condition: string;

  location: string;

  imageUrls?: string[];
}

export function MarketplaceCard({
  id,
  title,
  category,
  price,
  condition,
  location,
  imageUrls = [],
}: MarketplaceCardProps) {
  /**
   * Primary listing image.
   */
  const image =
    imageUrls?.[0];

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Link
        href={`/marketplace/${id}`}
      >
        <Card
          className="
            group
            overflow-hidden
            border-white/40
            bg-white/70
            shadow-lg
            shadow-slate-200/30
            backdrop-blur-xl
            transition-all
            duration-300
            hover:shadow-2xl
          "
        >
          {/* ========================= */}
          {/* IMAGE */}
          {/* ========================= */}

          <div
            className="
              relative
              h-56
              overflow-hidden
              bg-slate-100
            "
          >
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-blue-100
                  via-indigo-100
                  to-cyan-100
                "
              >
                <span
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  No Image
                </span>
              </div>
            )}

            {/* Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-black/0
                transition
                duration-300
                group-hover:bg-black/5
              "
            />
          </div>

          {/* ========================= */}
          {/* CONTENT */}
          {/* ========================= */}

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
                font-semibold
                text-blue-700
              "
            >
              {category}
            </div>

            {/* Title */}
            <h3
              className="
                mt-5
                line-clamp-1
                text-2xl
                font-bold
                text-slate-900
              "
            >
              {title}
            </h3>

            {/* Meta */}
            <div className="mt-5 space-y-3 text-sm text-slate-500">
              <p>{condition}</p>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />

                <span className="line-clamp-1">
                  {location}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between">
              {/* Price */}
              <span
                className="
                  text-2xl
                  font-black
                  text-slate-900
                "
              >
                LKR{" "}
                {price.toLocaleString()}
              </span>

              {/* CTA */}
              <span
                className="
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  group-hover:bg-blue-700
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