"use client";

/**
 * Cinematic animated background.
 *
 * Features:
 * - ambient moving gradients
 * - floating particles
 * - layered motion
 * - subtle premium atmosphere
 */

import { motion } from "framer-motion";

export function AnimatedBackground() {
  /**
   * Floating particles.
   */
  const particles = Array.from(
    { length: 18 },
    (_, i) => i
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* MAIN GRADIENT ORB */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-180px] top-[-180px] h-[520px] w-[520px] rounded-full bg-blue-300/30 blur-3xl"
      />

      {/* SECOND ORB */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-120px] top-[220px] h-[420px] w-[420px] rounded-full bg-indigo-300/20 blur-3xl"
      />

      {/* THIRD ORB */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-200px] left-[35%] h-[400px] w-[400px] rounded-full bg-sky-200/30 blur-3xl"
      />

      {/* FLOATING PARTICLES */}
      {particles.map((particle) => (
        <motion.div
          key={particle}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + particle % 5,
            repeat: Infinity,
            delay: particle * 0.3,
          }}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: `${6 + (particle % 4) * 4}px`,
            height: `${6 + (particle % 4) * 4}px`,
            left: `${(particle * 13) % 100}%`,
            top: `${(particle * 17) % 100}%`,
          }}
        />
      ))}

      {/* GRID OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#cbd5e110_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e110_1px,transparent_1px)]
          bg-[size:72px_72px]
        "
      />

      {/* SOFT LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" />
    </div>
  );
}