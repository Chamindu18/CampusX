"use client";

/**
 * Homepage safety section.
 */

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SafetyCard } from "@/components/ui/SafetyCard";

export function SafetySection() {
  return (
    <section
      id="safety"
      className="
        relative
        overflow-hidden
        py-40
      "
    >
      {/* Atmospheric Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-indigo-50/40
          via-blue-50/50
          to-slate-50
        "
      />

      {/* Large Ambient Glow */}
      <div
        className="
          absolute
          right-[-120px]
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-200/30
          blur-3xl
        "
      />

      {/* Ambient Glow 2 */}
      <div
        className="
          absolute
          bottom-[-150px]
          left-[-100px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-blue-200/20
          blur-3xl
        "
      />

      <Container className="relative z-10">
        {/* Heading */}
        <Reveal>
          <SectionTitle
            title="Built with student safety in mind"
            subtitle="CampusX is designed to encourage trusted interactions, safer communication, and campus-focused moderation."
          />
        </Reveal>

        {/* Content Layout */}
        <div className="mt-24 grid items-center gap-16 lg:grid-cols-2">
          {/* Left Text */}
          <Reveal>
            <div>
              <h3 className="text-4xl font-bold leading-tight text-slate-900">
                Modern campus trading should feel
                secure and transparent.
              </h3>

              <p className="mt-8 text-lg leading-8 text-slate-600">
                CampusX focuses on creating safer
                student interactions through
                university-based communities,
                reporting systems, moderation tools,
                and trusted communication flows.
              </p>
            </div>
          </Reveal>

          {/* Right Cards */}
          <div className="space-y-8">
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <SafetyCard
                title="Verified Communities"
                description="University-focused access helps create more trusted student interactions."
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
            >
              <SafetyCard
                title="Moderation Tools"
                description="Reporting and moderation systems help maintain healthier marketplace interactions."
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
            >
              <SafetyCard
                title="Campus Communication"
                description="Students can communicate safely before transactions and meetups."
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}