"use client";

/**
 * Sidebar conversation item.
 */

import { motion } from "framer-motion";

interface ConversationItemProps {
  user: string;
  lastMessage: string;
  time: string;
  active?: boolean;
}

export function ConversationItem({
  user,
  lastMessage,
  time,
  active,
}: ConversationItemProps) {
  return (
    <motion.button
      whileHover={{
        x: 4,
      }}
      className={`
        flex
        w-full
        items-start
        gap-4
        rounded-2xl
        p-4
        text-left
        transition-all
        duration-200

        ${
          active
            ? `
              bg-blue-600
              text-white
            `
            : `
              bg-white/60
              text-slate-700
              hover:bg-white
            `
        }
      `}
    >
      {/* Avatar */}
      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          font-bold

          ${
            active
              ? `
                bg-white/20
                text-white
              `
              : `
                bg-blue-100
                text-blue-700
              `
          }
        `}
      >
        {user.charAt(0)}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4">
          <h3 className="truncate font-semibold">
            {user}
          </h3>

          <span
            className={`
              text-xs

              ${
                active
                  ? "text-blue-100"
                  : "text-slate-400"
              }
            `}
          >
            {time}
          </span>
        </div>

        <p
          className={`
            mt-1
            truncate
            text-sm

            ${
              active
                ? "text-blue-100"
                : "text-slate-500"
            }
          `}
        >
          {lastMessage}
        </p>
      </div>
    </motion.button>
  );
}