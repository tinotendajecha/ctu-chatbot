"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth/AuthContext";
import { MOCK_PASSWORD } from "../lib/auth/mock-users";
import { Role } from "../lib/types";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { cn } from "../lib/utils";

type Mode = "signin" | "signup";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "prospective", label: "Prospective student" },
  { value: "student", label: "Current student" },
  { value: "lecturer", label: "Lecturer" },
  { value: "admin", label: "Admin" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("prospective");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "signin") {
      const user = login(email, password);
      if (!user) {
        setError("We couldn't find an account with that email and password.");
        return;
      }
    } else {
      if (!name.trim() || !email.trim()) {
        setError("Please fill in your name and email.");
        return;
      }
      signup(name, email, role);
    }

    router.push("/");
  }

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto bg-primary-tint px-4 py-10">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex rounded-lg bg-surface-alt p-1">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError("");
              }}
              className={cn(
                "min-h-[44px] flex-1 rounded-md text-sm font-semibold transition-colors",
                mode === m ? "bg-primary text-white" : "text-text-muted"
              )}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <h1 className="mb-1 font-heading text-2xl font-bold text-text">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mb-6 text-sm text-text-muted">
          {mode === "signin"
            ? "Sign in to save your chat history across devices."
            : "Tell us a bit about yourself to get personalized help."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <label className="flex flex-col gap-1 text-sm font-medium text-text">
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-[44px] rounded-lg border border-border px-3 outline-none focus:border-primary"
                placeholder="Tinotenda Jecha"
                required
              />
            </label>
          )}

          <label className="flex flex-col gap-1 text-sm font-medium text-text">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-[44px] rounded-lg border border-border px-3 outline-none focus:border-primary"
              placeholder="you@ctu.ac.za"
              required
            />
          </label>

          {mode === "signup" && (
            <label className="flex flex-col gap-1 text-sm font-medium text-text">
              I am a...
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="min-h-[44px] rounded-lg border border-border px-3 outline-none focus:border-primary"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="flex flex-col gap-1 text-sm font-medium text-text">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[44px] rounded-lg border border-border px-3 outline-none focus:border-primary"
              placeholder="••••••••"
              required
            />
          </label>

          {mode === "signin" && (
            <p className="text-xs text-text-faint">
              Demo accounts: student@ctu.ac.za / applicant@ctu.ac.za / lecturer@ctu.ac.za / admin@ctu.ac.za
              — password &quot;{MOCK_PASSWORD}&quot;
            </p>
          )}

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button type="submit" className="mt-2 w-full">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
