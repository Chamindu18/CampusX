/**
 * Reusable Button Component
 *
 * Prevents duplicated button styling.
 */

import {
  ButtonHTMLAttributes,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";

/**
 * Button style variants.
 */
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline";

/**
 * Button sizes.
 */
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      ...props
    },
    ref
  ) => {
    /**
     * Shared styles.
     */
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50";

    /**
     * Variant styles.
     */
    const variantStyles = {
      primary:
        "bg-blue-600 text-white shadow-sm hover:bg-blue-700",

      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200",

      outline:
        "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    };

    /**
     * Size styles.
     */
    const sizeStyles = {
      sm: "h-10 px-4 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";