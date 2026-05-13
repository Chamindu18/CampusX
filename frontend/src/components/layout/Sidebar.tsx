"use client";

/**
 * Platform sidebar navigation.
 *
 * Features:
 * - active route highlighting
 * - animated hover interactions
 * - create listing navigation
 * - glassmorphism styling
 * - responsive vertical layout
 */

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Store,
  Gavel,
  MessageSquare,
  User,
  Settings,
  PlusSquare,
} from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Sidebar navigation items.
 */
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Marketplace",
    href: "/marketplace",
    icon: Store,
  },

  {
    title: "Create Listing",
    href: "/create-listing",
    icon: PlusSquare,
  },

  {
    title: "Auctions",
    href: "/auctions",
    icon: Gavel,
  },

  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },

  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  /**
   * Current active pathname.
   */
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-[280px]
        flex-col
        border-r
        border-white/20
        bg-white/70
        px-6
        py-8
        backdrop-blur-xl
      "
    >
      {/* ========================= */}
      {/* BRAND */}
      {/* ========================= */}

      <div>
        <Link
          href="/"
          className="
            text-4xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          CampusX
        </Link>

        <p className="mt-3 text-sm text-slate-500">
          Student marketplace platform
        </p>
      </div>

      {/* ========================= */}
      {/* NAVIGATION */}
      {/* ========================= */}

      <nav className="mt-12 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => {
          /**
           * Detect active route.
           */
          const isActive =
            pathname === item.href;

          /**
           * Dynamic icon component.
           */
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                `
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                `,

                isActive
                  ? `
                    bg-blue-600
                    text-white
                    shadow-lg
                    shadow-blue-200/50
                  `
                  : `
                    text-slate-600
                    hover:bg-white/80
                    hover:text-slate-900
                  `
              )}
            >
              {/* Icon */}
              <Icon
                className={cn(
                  `
                    h-5
                    w-5
                    transition-transform
                    duration-200
                    group-hover:scale-110
                  `,
                  isActive
                    ? "text-white"
                    : "text-slate-500"
                )}
              />

              {/* Title */}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* ========================= */}
      {/* BOTTOM USER CARD */}
      {/* ========================= */}

      <div
        className="
          rounded-3xl
          border
          border-white/30
          bg-white/60
          p-5
          shadow-lg
          shadow-slate-200/30
        "
      >
        {/* Top Row */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-blue-600
              text-sm
              font-bold
              text-white
            "
          >
            CX
          </div>

          {/* User Info */}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              CampusX User
            </p>

            <p className="text-xs text-slate-500">
              Connected workspace
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-slate-200" />

        {/* Footer Text */}
        <p className="text-xs leading-6 text-slate-500">
          Buy, sell, and connect safely within
          trusted campus communities.
        </p>
      </div>
    </aside>
  );
}