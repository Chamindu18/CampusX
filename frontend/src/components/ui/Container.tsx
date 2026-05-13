/**
 * Global layout container.
 *
 * Keeps content:
 * - centered
 * - constrained
 * - responsive
 */

import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement> {}

export function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        /**
         * max-w-7xl
         * prevents stretched layouts
         *
         * px-6 lg:px-8
         * responsive spacing
         */
        "mx-auto w-full max-w-7xl px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}