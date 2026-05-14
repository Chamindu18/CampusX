"use client";

/**
 * Platform topbar.
 *
 * Features:
 * - authenticated user display
 * - logout functionality
 * - search UI
 * - notifications
 */

import {
  Bell,
  LogOut,
  Search,
} from "lucide-react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { useCurrentUser } from "@/hooks/use-current-user";

export function Topbar() {
  /**
   * Current authenticated user.
   */
  const {
    user,
    isLoading,
  } = useCurrentUser();

  /**
   * Next.js router.
   */
  const router = useRouter();

  /**
   * Logout handler.
   */
  async function handleLogout() {
    try {
      /**
       * Logout request.
       */
      const response =
        await fetch(
          "/api/auth/logout",
          {
            method: "POST",
          }
        );

      /**
       * Handle backend failure.
       */
      if (!response.ok) {
        toast.error(
          "Logout failed"
        );

        return;
      }

      /**
       * Success state.
       */
      toast.success(
        "Logged out successfully"
      );

      /**
       * Redirect to login.
       */
      router.push("/login");

      /**
       * Refresh route state.
       */
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-24
        items-center
        justify-between
        border-b
        border-white/20
        bg-white/50
        px-10
        backdrop-blur-xl
      "
    >
      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div
        className="
          flex
          h-14
          w-full
          max-w-md
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white/70
          px-5
        "
      >
        <Search className="h-5 w-5 text-slate-500" />

        <input
          type="text"
          placeholder="Search marketplace..."
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

      {/* ========================= */}
      {/* RIGHT SIDE */}
      {/* ========================= */}

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-white/70
            text-slate-700
            transition
            hover:bg-white
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-slate-900">
              {isLoading
                ? "Loading..."
                : user?.name ||
                  "Unknown User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email ||
                "No email"}
            </p>
          </div>

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
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}
          </div>

          {/* Logout */}
          <button
            onClick={
              handleLogout
            }
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-red-100
              text-red-600
              transition
              hover:bg-red-200
            "
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}