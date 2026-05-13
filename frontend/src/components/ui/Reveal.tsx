"use client";

/**
 * Reusable scroll reveal animation.
 *
 * Used for:
 * - smooth section appearance
 * - fade-up transitions
 * - cinematic scrolling experience
 */

import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
}

export function Reveal({
  children,
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
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
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}