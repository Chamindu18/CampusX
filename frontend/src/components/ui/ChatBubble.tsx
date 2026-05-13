"use client";

/**
 * Individual chat bubble.
 */

import { motion } from "framer-motion";

interface ChatBubbleProps {
  sender: "me" | "other";
  content: string;
}

export function ChatBubble({
  sender,
  content,
}: ChatBubbleProps) {
  const isMine = sender === "me";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`
        flex

        ${
          isMine
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className={`
          max-w-[75%]
          rounded-3xl
          px-5
          py-4
          text-sm
          leading-7
          shadow-lg

          ${
            isMine
              ? `
                bg-blue-600
                text-white
              `
              : `
                bg-white
                text-slate-700
              `
          }
        `}
      >
        {content}
      </div>
    </motion.div>
  );
}