import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Chip({ children, className, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-text transition-colors hover:border-primary hover:bg-primary-tint",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
