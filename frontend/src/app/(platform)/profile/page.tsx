"use client";

/**
 * Real authenticated profile page.
 */

import { motion } from "framer-motion";

import {
  Calendar,
  Mail,
  School,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/use-current-user";

import { useMyListings } from "@/hooks/use-my-listings";

import { Card } from "@/components/ui/Card";

import { ProfileListingCard } from "@/components/ui/ProfileListingCard";

export default function ProfilePage() {
  /**
   * Current authenticated user.
   */
  const { user } =
    useCurrentUser();

  /**
   * User listings.
   */
  const {
    listings,
    isLoading,
    mutate,
  } = useMyListings();

  /**
   * Remove deleted listing.
   */
  function handleDelete() {
    mutate();
  }

  /**
   * Loading state.
   */
  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ================================= */}
      {/* PROFILE HEADER */}
      {/* ================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
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
        {/* Banner */}
        <div
          className="
            h-48
            bg-gradient-to-br
            from-blue-500
            via-indigo-500
            to-cyan-500
          "
        />

        {/* Content */}
        <div className="relative px-10 pb-10">
          {/* Avatar */}
          <div
            className="
              absolute
              -top-16
              flex
              h-32
              w-32
              items-center
              justify-center
              rounded-[28px]
              border-4
              border-white
              bg-white
              text-4xl
              font-black
              text-slate-900
              shadow-xl
            "
          >
            {user.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          {/* Profile Content */}
          <div className="pt-24">
            <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
              {/* Left */}
              <div>
                <h1 className="text-5xl font-black tracking-tight text-slate-900">
                  {user.name}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  {user.bio ||
                    "CampusX marketplace member."}
                </p>

                {/* Meta */}
                <div className="mt-8 flex flex-col gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-3">
                    <School className="h-5 w-5" />

                    <span>
                      {user.university ||
                        "University not added"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />

                    <span>
                      {user.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />

                    <span>
                      CampusX Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black text-slate-900">
                    {listings.length}
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Listings
                  </p>
                </Card>

                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black text-slate-900">
                    Active
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Account
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================= */}
      {/* USER LISTINGS */}
      {/* ================================= */}

      <div className="mt-16">
        {/* Heading */}
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            My Listings
          </h2>

          <p className="mt-3 text-slate-500">
            Manage your marketplace listings.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-10">
            <p className="text-slate-500">
              Loading listings...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          listings.length === 0 && (
            <div
              className="
                mt-10
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
              <h3 className="text-2xl font-bold text-slate-900">
                No listings yet
              </h3>

              <p className="mt-4 text-slate-500">
                Create your first marketplace
                listing.
              </p>
            </div>
          )}

        {/* Listings Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {listings.map(
            (listing: any) => (
              <ProfileListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                price={listing.price}
                category={
                  listing.category
                }
                onDelete={
                  handleDelete
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}