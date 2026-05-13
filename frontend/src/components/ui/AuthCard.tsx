/**
 * Reusable auth container card.
 */

import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/40
        bg-white/70
        p-10
        shadow-2xl
        shadow-slate-200/40
        backdrop-blur-xl
      "
    >
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          {description}
        </p>
      </div>

      {/* Content */}
      <div className="mt-10">
        {children}
      </div>
    </div>
  );
}