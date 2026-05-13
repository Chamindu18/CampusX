"use client";

/**
 * Homepage features section.
 */

import { motion } from "framer-motion";

import { features } from "@/constants/home";

import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        py-36
      "
    >
      {/* Atmospheric Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-blue-50/60
          to-indigo-50/50
        "
      />

      {/* Blur Glow */}
      <div
        className="
          absolute
          left-1/2
          top-40
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-200/30
          blur-3xl
        "
      />

      <Container className="relative z-10">
        {/* Section Heading */}
        <Reveal>
          <SectionTitle
            title="Designed for safer campus trading"
            subtitle="CampusX focuses on trust, simplicity, and modern student experiences."
          />
        </Reveal>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >
              <FeatureCard
                title={feature.title}
                description={
                  feature.description
                }
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}