"use client";

/**
 * Final homepage CTA section.
 */

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-40">
      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-600
          via-indigo-600
          to-sky-600
        "
      />

      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <Container className="relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Heading */}
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            Start your campus marketplace
            experience
          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-blue-100">
            CampusX creates a modern platform for
            students to trade, connect, and interact
            more safely inside trusted campus
            communities.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="
                bg-white
                text-slate-900
                hover:bg-slate-100
              "
            >
              Create Account
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="
                border-white/40
                bg-white/10
                text-white
                hover:bg-white/20
              "
            >
              Explore Platform
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}