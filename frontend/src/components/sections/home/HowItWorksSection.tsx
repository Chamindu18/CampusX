"use client";

/**
 * Homepage process section.
 */

import { motion } from "framer-motion";

import { steps } from "@/constants/home";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepCard } from "@/components/ui/StepCard";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="
        relative
        overflow-hidden
        py-40
      "
    >
      {/* Background Transition */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-slate-50
          via-blue-50/30
          to-slate-100
        "
      />

      {/* Glow */}
      <div
        className="
          absolute
          left-1/2
          top-40
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-blue-200/20
          blur-3xl
        "
      />

      <Container className="relative z-10">
        {/* Heading */}
        <Reveal>
          <SectionTitle
            title="Simple from start to finish"
            subtitle="CampusX is designed to make campus trading feel intuitive, modern, and approachable."
          />
        </Reveal>

        {/* Steps Grid */}
        <div className="mt-24 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
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
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}