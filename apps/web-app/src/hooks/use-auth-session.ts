"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRefresh } from "@/hooks/use-refresh";
import { API_BASE_URL } from "@/config/globals";
import {
  getSessionStorageAccessToken,
  removeSessionStorageAccessToken,
} from "@/utils/auth-utils";

export function useAuthSession(baseUrl: string = API_BASE_URL) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const initializedRef = useRef(false);

  const { refresh, isPending: isRefreshing, error } = useRefresh(baseUrl);

  const clearAuthToken = () => {
    setAccessToken(null);
    removeSessionStorageAccessToken();
  };

  const redirectToLogin = useCallback(() => {
    const redirectTarget = `/login?from=${encodeURIComponent(
      `${pathname}${qs ? `?${qs}` : ""}`,
    )}`;
    router.replace(redirectTarget);
  }, [pathname, qs, router]);

  const handleAuthFailure = useCallback(() => {
    clearAuthToken();
    redirectToLogin();
  }, [clearAuthToken, redirectToLogin]);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const initializeSession = async () => {
      const storedToken = getSessionStorageAccessToken();
      if (storedToken) {
        setAccessToken(storedToken);
        removeSessionStorageAccessToken();
      }

      try {
        const result = await refresh();
        setAccessToken(result?.accessToken ?? null);
      } catch {
        handleAuthFailure();
      }
    };
    void initializeSession();
  }, [refresh]);

  useEffect(() => {
    if (error && !isRefreshing) {
      handleAuthFailure();
    }
  }, [error, isRefreshing, handleAuthFailure]);

  return {
    accessToken,
    isRefreshing,
    refresh,
  };
}
