"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth/AuthContext";
import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 rounded-lg px-1 hover:bg-surface-alt"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={user.name} />
        <span className="hidden text-sm font-semibold text-text md:inline">{user.name}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-2 w-56 rounded-lg border border-border bg-surface p-3 shadow-lg"
        >
          <p className="truncate text-sm font-semibold text-text">{user.name}</p>
          <p className="truncate text-xs text-text-muted">{user.email}</p>
          <Badge tone="primary" className="mt-2">
            {user.role}
          </Badge>
          <button
            onClick={() => {
              logout();
              setOpen(false);
              router.push("/");
            }}
            className="mt-3 min-h-[44px] w-full rounded-lg border border-border text-left text-sm font-medium text-text hover:bg-surface-alt px-2"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
