"use client";

/**
 * Global cinematic atmospheric background.
 *
 * Features:
 * - scroll-reactive atmosphere
 * - animated gradient mesh
 * - floating particles
 * - layered lighting system
 */

import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  /**
   * Scroll progress.
   */
  const { scrollYProgress } = useScroll();

  /**
   * Dynamic atmosphere transforms.
   */
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -250]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.65]
  );

  /**
   * Floating particles.
   */
  const particles = Array.from(
    { length: 30 },
    (_, i) => i
  );

  return (
    <motion.div
      style={{
        y: backgroundY,
        opacity,
      }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />

      {/* ORB 1 */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-220px]
          top-[-220px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-400/40
          blur-3xl
        "
      />

      {/* ORB 2 */}
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 90, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-180px]
          top-[200px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-indigo-400/30
          blur-3xl
        "
      />

      {/* ORB 3 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -70, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-250px]
          left-[25%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-300/30
          blur-3xl
        "
      />

      {/* FLOATING PARTICLES */}
      {particles.map((particle) => (
        <motion.div
          key={particle}
          animate={{
            y: [0, -40, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + (particle % 5),
            repeat: Infinity,
            delay: particle * 0.25,
          }}
          className="absolute rounded-full bg-blue-500/40"
          style={{
            width: `${4 + (particle % 5) * 3}px`,
            height: `${4 + (particle % 5) * 3}px`,
            left: `${(particle * 11) % 100}%`,
            top: `${(particle * 19) % 100}%`,
          }}
        />
      ))}

      {/* GRID */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)]
          bg-[size:64px_64px]
        "
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-white/20" />
    </motion.div>
  );
}