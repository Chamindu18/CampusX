"use client";

/**
 * Homepage categories section.
 */

import { motion } from "framer-motion";

import { categories } from "@/constants/home";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CategoryCard } from "@/components/ui/CategoryCard";

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="relative py-32"
    >
      <Container>
        {/* Section Title */}
        <Reveal>
          <SectionTitle
            title="Everything students need, all in one place"
            subtitle="Discover categories designed around modern student life and campus communities."
          />
        </Reveal>

        {/* Cards Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
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
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <CategoryCard
                title={category.title}
                description={
                  category.description
                }
                icon={category.icon}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}