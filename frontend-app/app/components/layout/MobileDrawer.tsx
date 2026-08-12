"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "../../lib/utils";

type DrawerSide = "left" | "right" | "bottom";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  side: DrawerSide;
  children: ReactNode;
}

const PANEL_POSITION: Record<DrawerSide, string> = {
  left: "inset-y-0 left-0 w-[85vw] max-w-xs",
  right: "inset-y-0 right-0 w-[85vw] max-w-xs",
  bottom: "inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl",
};

const PANEL_TRANSFORM: Record<DrawerSide, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  bottom: "translate-y-full",
};

// Generic slide-in-from-an-edge panel + backdrop, shared by the mobile chat
// sidebar (side="left") and the mobile sources sheet (side="bottom").
export default function MobileDrawer({ open, onClose, side, children }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-text/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute flex flex-col bg-surface shadow-xl transition-transform duration-300",
          PANEL_POSITION[side],
          open ? "translate-x-0 translate-y-0" : PANEL_TRANSFORM[side]
        )}
      >
        {children}
      </div>
    </div>
  );
}
