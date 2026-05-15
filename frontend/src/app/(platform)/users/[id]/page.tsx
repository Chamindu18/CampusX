/**
 * Public user profile page.
 */

import Link from "next/link";

import { MarketplaceCard } from "@/components/ui/MarketplaceCard";

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getUser(
  id: string
) {
  const response =
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${id}`,
      {
        cache: "no-store",
      }
    );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function UserPage({
  params,
}: UserPageProps) {
  /**
   * Dynamic route params.
   */
  const { id } =
    await params;

  /**
   * Fetch public user.
   */
  const user =
    await getUser(id);

  /**
   * Missing user.
   */
  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-slate-500">
          User not found
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div
        className="
          rounded-[32px]
          border
          border-white/40
          bg-white/70
          p-10
          backdrop-blur-xl
        "
      >
        <h1 className="text-5xl font-black tracking-tight text-slate-900">
          {user.name}
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          {user.university ||
            "Campus member"}
        </p>

        {user.bio && (
          <p className="mt-8 max-w-3xl leading-8 text-slate-600">
            {user.bio}
          </p>
        )}

        <div className="mt-10">
          <Link href="/messages">
            <button
              className="
                rounded-2xl
                bg-blue-600
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Message User
            </button>
          </Link>
        </div>
      </div>

      {/* LISTINGS */}
      <div className="mt-16">
        <h2 className="text-3xl font-black text-slate-900">
          Listings
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {user.listings.map(
            (listing: any) => (
              <MarketplaceCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                category={
                  listing.category
                }
                price={
                  listing.price
                }
                condition={
                  listing.condition
                }
                location={
                  listing.location
                }
                imageUrls={
                  listing.imageUrls
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}