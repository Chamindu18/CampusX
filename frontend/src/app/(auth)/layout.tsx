/**
 * Authentication layout.
 *
 * Shared layout for:
 * - login
 * - signup
 */

import type { ReactNode } from "react";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-20">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </main>
  );
}