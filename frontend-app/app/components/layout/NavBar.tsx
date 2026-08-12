"use client";

import Link from "next/link";
import { useAuth } from "../../lib/auth/AuthContext";
import Button from "../ui/Button";
import AdminTabs from "./AdminTabs";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { user } = useAuth();

  return (
    <header className="border-b-2 border-primary bg-surface">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <h1 className="font-heading text-3xl font-extrabold text-primary">CTU</h1>
          <span className="hidden text-2xl text-text-faint md:block">|</span>
          <div className="hidden flex-col text-sm font-bold text-text-muted md:flex">
            <p>Campus</p>
            <p>Assistant</p>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 overflow-x-auto">
          {user?.role === "admin" && <AdminTabs />}

          {user ? (
            <UserMenu />
          ) : (
            <div className="flex shrink-0 gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
