"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { API_BASE_URL } from "@/config/globals";

type AuthContextValue = ReturnType<typeof useAuthSession>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const value = useAuthSession(API_BASE_URL);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
