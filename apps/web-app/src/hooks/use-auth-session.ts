"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRefresh } from "@/hooks/use-refresh";
import { API_BASE_URL } from "@/config/globals";

export function useAuthSession(baseUrl: string = API_BASE_URL) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  const {
    mutate: refreshTokenMutate,
    isPending: isRefreshing,
    accessToken: accToken,
    error,
    isUnauthorized,
  } = useRefresh(baseUrl);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const initializedRef = useRef(false);

  const clearAccessToken = useCallback(() => {
    setAccessToken(null);
  }, []);

  useEffect(() => {
    if (accToken !== undefined) {
      setAccessToken(accToken);
    }
  }, [accToken]);

  useEffect(() => {
    if (error && !isRefreshing) {
      setAccessToken(null);
      const from = `${pathname}${qs ? `?${qs}` : ""}`;
      router.replace(`/login?from=${encodeURIComponent(from)}`);
    }
  }, [
    isUnauthorized,
    accToken,
    accessToken,
    isRefreshing,
    pathname,
    qs,
    router,
  ]);

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const storedToken = sessionStorage.getItem("auth.accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
      sessionStorage.removeItem("auth.accessToken");
      return;
    }

    void refreshTokenMutate();
  }, []);

  return {
    accessToken,
    isRefreshing,
    refresh: refreshTokenMutate,
    clearAccessToken,
  };
}
