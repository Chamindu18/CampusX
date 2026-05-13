"use client";

/**
 * Premium feature card.
 */

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-8
        shadow-lg
        shadow-slate-200/40
        backdrop-blur-xl
      "
    >
      {/* Glow Layer */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-100/0
          via-indigo-100/0
          to-indigo-200/20
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-blue-100
          to-indigo-100
          text-blue-700
        "
      >
        <Icon className="h-8 w-8" />
      </div>

      {/* Content */}
      <div className="relative mt-8">
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}