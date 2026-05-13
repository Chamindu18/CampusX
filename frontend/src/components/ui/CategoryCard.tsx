"use client";

/**
 * Interactive category card.
 */

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card
        className="
          group
          relative
          overflow-hidden
          border-white/40
          bg-white/70
          p-8
          shadow-lg
          shadow-slate-200/40
          backdrop-blur-xl
          transition-all
          duration-300
          hover:shadow-2xl
        "
      >
        {/* Background Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-blue-100/0
            via-blue-100/0
            to-blue-200/20
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 6,
            scale: 1.08,
          }}
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >
          <Icon className="h-8 w-8" />
        </motion.div>

        {/* Content */}
        <div className="relative mt-8">
          <h3 className="text-2xl font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}