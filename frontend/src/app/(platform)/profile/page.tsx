"use client";

/**
 * User profile page.
 */

import { motion } from "framer-motion";

import {
  Mail,
  School,
  Calendar,
} from "lucide-react";

import { mockUser } from "@/constants/mock-user";

import { Card } from "@/components/ui/Card";
import { ProfileListingCard } from "@/components/ui/ProfileListingCard";

export default function ProfilePage() {
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
            CX
          </div>

          {/* Profile Content */}
          <div className="pt-24">
            <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
              {/* Left */}
              <div>
                <h1 className="text-5xl font-black tracking-tight text-slate-900">
                  {mockUser.name}
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  {mockUser.bio}
                </p>

                {/* Meta */}
                <div className="mt-8 flex flex-col gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-3">
                    <School className="h-5 w-5" />

                    <span>
                      {mockUser.university}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5" />

                    <span>
                      {mockUser.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />

                    <span>
                      {mockUser.joined}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-5">
                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black text-slate-900">
                    12
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Listings
                  </p>
                </Card>

                <Card className="border-white/40 bg-white/70 p-6 text-center backdrop-blur-xl">
                  <div className="text-4xl font-black text-slate-900">
                    8
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Transactions
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              My Listings
            </h2>

            <p className="mt-3 text-slate-500">
              Manage your marketplace listings and
              activity.
            </p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {mockUser.listings.map(
            (listing, index) => (
              <motion.div
                key={listing.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <ProfileListingCard
                  title={listing.title}
                  price={listing.price}
                  status={listing.status}
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}