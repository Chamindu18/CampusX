"use client";

/**
 * Marketplace listing detail page.
 */

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import {
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import { ReportModal } from "@/components/ui/ReportModal";

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Listing {
  id: string;

  title: string;

  description: string;

  category: string;

  price: number;

  imageUrls: string[];

  condition: string;

  location: string;

  user: {
    id: string;

    name: string;

    email: string;
  };
}

export default function ListingPage({
  params,
}: ListingPageProps) {
  /**
   * Listing state.
   */
  const [listing, setListing] =
    useState<Listing | null>(
      null
    );

  /**
   * Loading state.
   */
  const [loading, setLoading] =
    useState(true);

  /**
   * Active image.
   */
  const [
    activeImage,
    setActiveImage,
  ] = useState("");

  /**
   * Report modal state.
   */
  const [reportOpen, setReportOpen] =
    useState(false);

  /**
   * Save loading.
   */
  const [saving, setSaving] =
    useState(false);

  /**
   * Messaging loading.
   */
  const [
    messaging,
    setMessaging,
  ] = useState(false);

  /**
   * Fetch listing.
   */
  useEffect(() => {
    async function fetchListing() {
      try {
        const resolvedParams =
          await params;

        const response =
          await fetch(
            `/api/listings/${resolvedParams.id}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch listing"
          );
        }

        const data =
          await response.json();

        setListing(data);

        setActiveImage(
          data.imageUrls?.[0] ||
            ""
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load listing"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchListing();
  }, [params]);

  /**
   * Save listing.
   */
  async function handleSave() {
    if (!listing) {
      return;
    }

    try {
      setSaving(true);

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
    } finally {
      setSaving(false);
    }
  }

  /**
   * Message seller.
   */
  async function handleMessageSeller() {
    if (!listing) {
      return;
    }

    try {
      setMessaging(true);

      const response =
        await fetch(
          "/api/conversations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              targetUserId:
                listing.user.id,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        toast.error(
          result.error ||
            "Failed to open chat"
        );

        return;
      }

      toast.success(
        "Conversation opened"
      );

      window.location.href = `/messages?conversationId=${result.id}`;
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to message seller"
      );
    } finally {
      setMessaging(false);
    }
  }

  /**
   * Loading UI.
   */
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading listing...
        </p>
      </div>
    );
  }

  /**
   * Missing listing.
   */
  if (!listing) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Listing not found
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="relative h-[520px] overflow-hidden rounded-[32px] border border-white/40 bg-white/70 shadow-xl backdrop-blur-xl">
              {activeImage ? (
                <Image
                  src={activeImage}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-slate-400">
                    No image
                  </p>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {listing.imageUrls
              .length > 1 && (
              <div className="mt-5 flex gap-4 overflow-x-auto">
                {listing.imageUrls.map(
                  (
                    image
                  ) => (
                    <button
                      key={image}
                      onClick={() =>
                        setActiveImage(
                          image
                        )
                      }
                      className={`relative h-24 w-24 overflow-hidden rounded-2xl border-2 ${
                        activeImage ===
                        image
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {listing.category}
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
              {listing.title}
            </h1>

            <div className="mt-8 flex items-center gap-3 text-slate-500">
              <MapPin className="h-5 w-5" />

              <span>
                {listing.location}
              </span>
            </div>

            <div className="mt-10">
              <p className="text-6xl font-black text-slate-900">
                $
                {listing.price.toFixed(
                  2
                )}
              </p>

              <p className="mt-3 text-lg text-slate-500">
                {
                  listing.condition
                }
              </p>
            </div>

            <div className="mt-12 leading-8 text-slate-600">
              {
                listing.description
              }
            </div>

            {/* Seller */}
            <div className="mt-12 rounded-3xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {listing.user.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {
                      listing.user
                        .name
                    }
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Trusted CampusX seller
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  onClick={
                    handleSave
                  }
                  disabled={saving}
                  variant="secondary"
                  className="flex items-center gap-3"
                >
                  <Heart className="h-5 w-5" />

                  {saving
                    ? "Saving..."
                    : "Save Listing"}
                </Button>

                <Button
                  onClick={
                    handleMessageSeller
                  }
                  disabled={
                    messaging
                  }
                  className="flex items-center gap-3"
                >
                  <MessageCircle className="h-5 w-5" />

                  {messaging
                    ? "Opening..."
                    : "Message Seller"}
                </Button>

                <Button
                  onClick={() =>
                    setReportOpen(
                      true
                    )
                  }
                  variant="destructive"
                  className="flex items-center gap-3"
                >
                  <Flag className="h-5 w-5" />

                  Report
                </Button>
              </div>
            </div>

            {/* Protection */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl bg-green-50 px-6 py-5 text-green-700">
              <ShieldCheck className="h-6 w-6" />

              <p className="font-medium">
                Protected by CampusX
                marketplace safety
              </p>
            </div>

            {/* Back */}
            <div className="mt-10">
              <Link
                href="/marketplace"
                className="text-sm font-semibold text-blue-600"
              >
                ← Back to marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Report modal */}
      <ReportModal
        open={reportOpen}
        onClose={() =>
          setReportOpen(false)
        }
        listingId={listing.id}
      />
    </>
  );
}