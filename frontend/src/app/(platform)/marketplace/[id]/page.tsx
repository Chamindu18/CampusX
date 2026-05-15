"use client";

/**
 * Premium marketplace listing page.
 */

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import {
  Heart,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function ListingPage({
  params,
}: ListingPageProps) {
  /**
   * Route params.
   */
  const { id } =
    await params;

  /**
   * Fetch listing.
   */
  const listing =
    await getListing(id);

  /**
   * Missing listing.
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
    <ListingDetailClient
      listing={listing}
    />
  );
}

/* ===================================================== */
/* CLIENT COMPONENT */
/* ===================================================== */

function ListingDetailClient({
  listing,
}: any) {
  /**
   * Active image state.
   */
  const [
    activeImage,
    setActiveImage,
  ] = useState(
    listing.imageUrls?.[0] ||
      null
  );

  /**
   * Save listing.
   */
  async function handleSave() {
    try {
      const response =
        await fetch(
          "/api/saved-listings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              listingId:
                listing.id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error
        );

        return;
      }

      toast.success(
        "Listing saved"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to save listing"
      );
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-14 lg:grid-cols-2">
        {/* ================================= */}
        {/* IMAGE GALLERY */}
        {/* ================================= */}

        <div>
          {/* Main Image */}
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
            {activeImage ? (
              <Image
                src={activeImage}
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

          {/* Thumbnails */}
          {listing.imageUrls
            ?.length > 1 && (
            <div className="mt-5 grid grid-cols-4 gap-4">
              {listing.imageUrls.map(
                (
                  image: string
                ) => (
                  <button
                    key={image}
                    onClick={() =>
                      setActiveImage(
                        image
                      )
                    }
                    className={`
                      relative
                      h-28
                      overflow-hidden
                      rounded-2xl
                      border-2
                      transition
                      ${
                        activeImage ===
                        image
                          ? `
                            border-blue-600
                          `
                          : `
                            border-transparent
                          `
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt="Listing image"
                      fill
                      className="object-cover"
                    />
                  </button>
                )
              )}
            </div>
          )}
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

          {/* Seller */}
          <div
            className="
              mt-12
              rounded-3xl
              border
              border-white/40
              bg-white/70
              p-6
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-slate-500">
              Seller
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {
                listing.user.name
              }
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {
                listing.user.email
              }
            </p>
          </div>

          {/* Actions */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link href="/messages">
              <Button size="lg">
                Contact Seller
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={
                handleSave
              }
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