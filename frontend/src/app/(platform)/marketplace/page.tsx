"use client";

/**
 * Marketplace browsing page.
 *
 * Features:
 * - searchable listings
 * - interactive category filters
 * - animated listing grid
 * - marketplace quick actions
 * - responsive layout
 */

import { useMemo, useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { Plus, Search } from "lucide-react";

import { mockListings } from "@/constants/mock-listings";

import { MarketplaceCard } from "@/components/ui/MarketplaceCard";

/**
 * Marketplace categories.
 */
const filters = [
  "All",
  "Books",
  "Electronics",
  "Gaming",
  "Furniture",
  "Accessories",
];

export default function MarketplacePage() {
  /**
   * Search query state.
   */
  const [searchQuery, setSearchQuery] =
    useState("");

  /**
   * Active category filter.
   */
  const [activeFilter, setActiveFilter] =
    useState("All");

  /**
   * Filter listings dynamically.
   */
  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      /**
       * Search matching.
       */
      const matchesSearch =
        listing.title
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          ) ||
        listing.category
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      /**
       * Category matching.
       */
      const matchesCategory =
        activeFilter === "All"
          ? true
          : listing.category === activeFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [searchQuery, activeFilter]);

  return (
    <div>
      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Marketplace
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Browse listings from trusted student
            communities across universities and
            campuses.
          </p>
        </div>

        {/* Create Listing */}
        <Link href="/create-listing">
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-blue-600
              px-6
              py-4
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-200/50
              transition
              hover:bg-blue-700
            "
          >
            <Plus className="h-5 w-5" />

            Create Listing
          </motion.button>
        </Link>
      </div>

      {/* ================================= */}
      {/* SEARCH + FILTERS */}
      {/* ================================= */}

      <div className="mt-12">
        {/* Search */}
        <div
          className="
            flex
            h-16
            w-full
            items-center
            gap-4
            rounded-3xl
            border
            border-white/40
            bg-white/70
            px-6
            shadow-lg
            shadow-slate-200/30
            backdrop-blur-xl
          "
        >
          <Search className="h-5 w-5 text-slate-500" />

          <input
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search listings, categories, and campus items..."
            className="
              w-full
              bg-transparent
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive =
              activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`
                  rounded-2xl
                  px-5
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        bg-blue-600
                        text-white
                        shadow-lg
                        shadow-blue-200/40
                      `
                      : `
                        border
                        border-white/40
                        bg-white/70
                        text-slate-700
                        backdrop-blur-xl
                        hover:bg-white
                      `
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================================= */}
      {/* RESULTS */}
      {/* ================================= */}

      <div className="mt-10 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredListings.length}
          </span>{" "}
          listings
        </p>
      </div>

      {/* ================================= */}
      {/* LISTINGS GRID */}
      {/* ================================= */}

      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredListings.map(
          (listing, index) => (
            <motion.div
              key={listing.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
            >
              <MarketplaceCard
                id={listing.id}
                title={listing.title}
                category={listing.category}
                price={listing.price}
                condition={
                  listing.condition
                }
                location={listing.location}
              />
            </motion.div>
          )
        )}
      </div>

      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {filteredListings.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            mt-20
            rounded-3xl
            border
            border-dashed
            border-slate-300
            bg-white/50
            px-10
            py-20
            text-center
            backdrop-blur-xl
          "
        >
          <h2 className="text-3xl font-bold text-slate-900">
            No listings found
          </h2>

          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
            Try adjusting your search or filters
            to discover more marketplace items.
          </p>
        </motion.div>
      )}
    </div>
  );
}