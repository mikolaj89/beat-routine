"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { API_BASE_URL } from "@/config/globals";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { RefreshResponse } from "@drum-scheduler/contracts";

type AuthContextValue = {
  accessToken: string | null;
  isRefreshing: boolean;
  refresh: UseMutateAsyncFunction<RefreshResponse, Error, void, unknown>;
  clearAccessToken: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { accessToken, isRefreshing, refresh, clearAccessToken } =
    useAuthSession(API_BASE_URL);

  const value = useMemo<AuthContextValue>(
    () => ({ accessToken, isRefreshing, refresh, clearAccessToken }),
    [accessToken, clearAccessToken, isRefreshing, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
