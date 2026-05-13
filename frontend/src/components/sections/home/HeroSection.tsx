"use client";

/**
 * Cinematic homepage hero section.
 */

import { motion } from "framer-motion";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Container } from "@/components/ui/Container";
import { HeroSearch } from "@/components/ui/HeroSearch";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
      {/* Atmospheric Background */}
      <AnimatedBackground />

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {/* Small Label */}
          <div className="rounded-full border border-white/40 bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md">
            Modern student marketplace platform
          </div>

          {/* Main Branding */}
          <h1 className="mt-10 text-7xl font-black tracking-tight text-slate-900 sm:text-8xl md:text-9xl">
            CampusX
          </h1>

          {/* Animated Text */}
          <motion.p
            key="subtitle"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl"
          >
            A modern marketplace experience built
            for university students to buy, sell,
            trade, and connect safely inside trusted
            campus communities.
          </motion.p>

          {/* Search Experience */}
          <HeroSearch />

          {/* Scroll Indicator */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mt-24 flex flex-col items-center"
          >
            <div className="h-14 w-[1px] bg-gradient-to-b from-slate-400 to-transparent" />

            <span className="mt-4 text-sm text-slate-500">
              Scroll to discover
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}