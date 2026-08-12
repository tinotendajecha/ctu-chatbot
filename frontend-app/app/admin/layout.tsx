"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../lib/auth/AuthContext";
import Button from "../components/ui/Button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [isLoading, user, router]);

  if (isLoading || !user) return null;

  if (user.role !== "admin") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="font-heading text-xl font-bold text-text">You don&apos;t have access to this page</p>
        <p className="max-w-sm text-sm text-text-muted">
          The admin dashboard is only available to CTU staff accounts.
        </p>
        <Link href="/">
          <Button variant="outline">Back to chat</Button>
        </Link>
      </div>
    );
  }

  return <div className="h-full overflow-y-auto">{children}</div>;
}
