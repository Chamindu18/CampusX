"use client";

/**
 * Platform sidebar navigation.
 */

import Link from "next/link";

import { usePathname } from "next/navigation";

import { navigationItems } from "@/constants/navigation";

import { cn } from "@/lib/utils";

export function Sidebar() {
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
      {/* Brand */}
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

      {/* Navigation */}
      <nav className="mt-12 flex flex-1 flex-col gap-2">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                `
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
                  `
                  : `
                    text-slate-600
                    hover:bg-white/80
                    hover:text-slate-900
                  `
              )}
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Area */}
      <div
        className="
          rounded-2xl
          border
          border-white/30
          bg-white/60
          p-4
        "
      >
        <p className="text-sm font-medium text-slate-900">
          CampusX Platform
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Connected student workspace
        </p>
      </div>
    </aside>
  );
}