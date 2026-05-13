/**
 * Dynamic marketplace listing page.
 */

import { notFound } from "next/navigation";

import {
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { mockListings } from "@/constants/mock-listings";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ListingPageProps {
  params: {
    id: string;
  };
}

export default function ListingPage({
  params,
}: ListingPageProps) {
  /**
   * Find listing by id.
   */
  const listing = mockListings.find(
    (item) =>
      item.id === Number(params.id)
  );

  /**
   * Handle invalid listing.
   */
  if (!listing) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-14 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div>
          <Card
            className="
              overflow-hidden
              border-white/40
              bg-white/70
              backdrop-blur-xl
            "
          >
            {/* Main Image */}
            <div
              className="
                h-[500px]
                bg-gradient-to-br
                from-blue-100
                via-indigo-100
                to-cyan-100
              "
            />

            {/* Gallery */}
            <div className="grid grid-cols-3 gap-4 p-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-28
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-100
                    to-indigo-100
                  "
                />
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT CONTENT */}
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
              font-medium
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
            {listing.price}
          </div>

          {/* Meta */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <ShieldCheck className="h-5 w-5" />

              <span>{listing.condition}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <MapPin className="h-5 w-5" />

              <span>{listing.location}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <Clock className="h-5 w-5" />

              <span>{listing.posted}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">
              Description
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {listing.description}
            </p>
          </div>

          {/* Seller */}
          <Card
            className="
              mt-12
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
              {listing.seller}
            </h3>
          </Card>

          {/* Actions */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg">
              Contact Seller
            </Button>

            <Button
              size="lg"
              variant="outline"
            >
              Save Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}