import { useCallback, useEffect, useRef, useState } from "react";
import { useMobileRefresh } from "./use-mobile-refresh";
import { useMobileLogin } from "./use-mobile-login";
import { clearAuthTokensInStorage } from "../utils/auth-storage";
import type { UserInput } from "@drum-scheduler/contracts";

export function useMobileAuthSession(baseUrl: string) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSessionInitialized, setIsSessionInitialized] = useState(false);
  const initializedRef = useRef(false);

  const {
    refresh: refreshMutation,
    isPending: isRefreshing,
    error,
  } = useMobileRefresh(baseUrl);
  const {
    login: loginMutation,
    isPending: isLoginPending,
    error: loginError,
  } = useMobileLogin(baseUrl);

  const clearAuthState = useCallback(async () => {
    setAccessToken(null);
    await clearAuthTokensInStorage();
  }, []);

  const handleAuthFailure = useCallback(async () => {
    await clearAuthState();
  }, [clearAuthState]);

  const refresh = useCallback(async () => {
    const result = await refreshMutation();
    setAccessToken(result?.accessToken ?? null);
    return result;
  }, [refreshMutation]);

  const login = useCallback(
    async (credentials: UserInput) => {
      const response = await loginMutation(credentials);
      setAccessToken(response.accessToken ?? null);
      return response;
    },
    [loginMutation],
  );

  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const initializeSession = async () => {
      try {
        await refresh();
      } catch {
        await handleAuthFailure();
      } finally {
        setIsSessionInitialized(true);
      }
    };

    void initializeSession();
  }, [refresh, handleAuthFailure]);

  useEffect(() => {
    if (error && !isRefreshing) {
      void handleAuthFailure();
    }
  }, [error, isRefreshing, handleAuthFailure]);

  return {
    accessToken,
    isAuthenticated: Boolean(accessToken),
    isSessionInitialized,
    isRefreshing,
    isLoginPending,
    loginError,
    login,
    refresh,
    logout: handleAuthFailure,
  };
}
