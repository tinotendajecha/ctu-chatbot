import { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

// Fixed 44x44 hit target regardless of the icon's visual size, per WCAG target guidance.
export default function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-alt hover:text-text",
        className
      )}
      {...props}
    />
  );
}
