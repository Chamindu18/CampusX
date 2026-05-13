import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        `
          h-12
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white/80
          px-4
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
        `,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";