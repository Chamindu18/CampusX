"use client";

/**
 * Cinematic homepage hero section.
 */

import { motion } from "framer-motion";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Hero Section Component
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
      {/* Animated Background */}
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
          <div className="rounded-full border border-slate-200 bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md">
            Modern student marketplace platform
          </div>

          {/* Main Title */}
          <h1 className="mt-10 text-7xl font-black tracking-tight text-slate-900 sm:text-8xl md:text-9xl">
            CampusX
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            A modern marketplace experience built
            for university students to buy, sell,
            trade, and connect safely inside trusted
            campus communities.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Button size="lg">
              Explore Marketplace
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              Learn More
            </Button>
          </div>

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