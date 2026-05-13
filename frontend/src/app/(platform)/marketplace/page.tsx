"use client";

/**
 * Marketplace browsing page.
 */

import { Search } from "lucide-react";

import { mockListings } from "@/constants/mock-listings";

import { MarketplaceCard } from "@/components/ui/MarketplaceCard";

export default function MarketplacePage() {
  return (
    <div>
      {/* Heading */}
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          Marketplace
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Browse listings from trusted campus
          communities.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div
          className="
            flex
            h-14
            w-full
            max-w-xl
            items-center
            gap-3
            rounded-2xl
            border
            border-white/40
            bg-white/70
            px-5
            backdrop-blur-xl
          "
        >
          <Search className="h-5 w-5 text-slate-500" />

          <input
            placeholder="Search listings..."
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {[
            "All",
            "Books",
            "Electronics",
            "Gaming",
            "Furniture",
          ].map((filter) => (
            <button
              key={filter}
              className="
                rounded-2xl
                border
                border-white/40
                bg-white/70
                px-5
                py-3
                text-sm
                font-medium
                text-slate-700
                backdrop-blur-xl
                transition
                hover:bg-white
              "
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {mockListings.map((listing) => (
          <MarketplaceCard
            key={listing.id}
            title={listing.title}
            category={listing.category}
            price={listing.price}
            condition={listing.condition}
            location={listing.location}
            id={listing.id}
          />
        ))}
      </div>
    </div>
  );
}