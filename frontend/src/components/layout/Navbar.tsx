"use client";

/**
 * Cinematic homepage navbar.
 */

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <Container>
        <div className="mt-5 flex h-20 items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            CampusX
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#categories"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Categories
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Features
            </a>

            <a
              href="#safety"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Safety
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              How It Works
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
            >
              Login
            </Button>

            <Button size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}