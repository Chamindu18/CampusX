"use client";

/**
 * Platform topbar.
 */

import { Bell, Search } from "lucide-react";

export function Topbar() {
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
      {/* Search */}
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
          placeholder="Search marketplace..."
          className="
            w-full
            bg-transparent
            text-sm
            outline-none
            placeholder:text-slate-400
          "
        />
      </div>

      {/* Actions */}
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
      </div>
    </header>
  );
}