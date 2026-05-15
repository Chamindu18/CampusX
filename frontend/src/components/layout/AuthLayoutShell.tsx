"use client";

import type { ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

interface AuthLayoutShellProps {
  children: ReactNode;
}

export function AuthLayoutShell({
  children,
}: AuthLayoutShellProps) {
  const pathname = usePathname();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-20">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.98,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
          className="relative z-10 w-full max-w-md"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}