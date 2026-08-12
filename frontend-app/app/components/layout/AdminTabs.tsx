"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const TABS = [
  { href: "/", label: "Chat" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/upload", label: "Data Upload" },
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold transition-colors",
              active ? "bg-primary-tint text-primary" : "text-text-muted hover:text-text"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
