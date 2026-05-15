/**
 * Marketplace listing detail page.
 */

import Link from "next/link";

import Image from "next/image";

import {
  Heart,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Fetch listing from API.
 */
async function getListing(
  id: string
) {
  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/listings/${id}`,
      {
        cache: "no-store",
      }
    );

  /**
   * Missing listing.
   */
  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ListingPage({
  params,
}: ListingPageProps) {
  /**
   * Dynamic route params.
   */
  const { id } =
    await params;

  /**
   * Fetch listing.
   */
  const listing =
    await getListing(id);

  /**
   * Listing missing.
   */
  if (!listing) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          Listing not found
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-14 lg:grid-cols-2">
        {/* ================================= */}
        {/* IMAGE SECTION */}
        {/* ================================= */}

        <div>
          <div
            className="
              relative
              h-[520px]
              overflow-hidden
              rounded-[32px]
              border
              border-white/40
              bg-white/70
              shadow-xl
              shadow-slate-200/30
              backdrop-blur-xl
            "
          >
            {listing.imageUrls?.[0] ? (
              <Image
                src={
                  listing.imageUrls[0]
                }
                alt={listing.title}
                fill
                className="object-cover"
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
                <p className="text-slate-500">
                  No image available
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div>
          {/* Category */}
          <div
            className="
              inline-flex
              rounded-full
              bg-blue-100
              px-4
              py-2
              text-sm
              font-semibold
              text-blue-700
            "
          >
            {listing.category}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
            {listing.title}
          </h1>

          {/* Price */}
          <div className="mt-8 text-4xl font-black text-blue-600">
            LKR{" "}
            {listing.price.toLocaleString()}
          </div>

          {/* Meta */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <ShieldCheck className="h-5 w-5" />

              <span>
                {listing.condition}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-5 w-5" />

              <span>
                {listing.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Description
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {
                listing.description
              }
            </p>
          </div>

          {/* ================================= */}
          {/* SELLER */}
          {/* ================================= */}

          <Link
            href={`/users/${listing.user.id}`}
            className="
              mt-12
              block
              rounded-3xl
              border
              border-white/40
              bg-white/70
              p-6
              backdrop-blur-xl
              transition
              hover:bg-white
            "
          >
            <p className="text-sm text-slate-500">
              Seller
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {listing.user.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {listing.user.email}
            </p>
          </Link>

          {/* ================================= */}
          {/* ACTIONS */}
          {/* ================================= */}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href="/messages">
              <Button size="lg">
                Contact Seller
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
            >
              <Heart className="mr-2 h-5 w-5" />

              Save Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}