"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Role, User } from "../types";
import { createAccount, findAccount } from "./mock-users";

const STORAGE_KEY = "ctu-assistant:user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => User | null;
  signup: (name: string, email: string, role: Role) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage is only readable client-side, so the logged-in user is genuinely
    // unknown during SSR/first paint — this sync-after-mount hydration is unavoidable here.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setUser(JSON.parse(stored) as User);
    setIsLoading(false);
  }, []);

  function persist(next: User) {
    setUser(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function login(email: string, password: string) {
    const account = findAccount(email, password);
    if (account) persist(account);
    return account;
  }

  function signup(name: string, email: string, role: Role) {
    const account = createAccount(name, email, role);
    persist(account);
    return account;
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
