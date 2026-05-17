"use client";

import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@drum-scheduler/sdk";
import type { UserInput } from "@drum-scheduler/contracts";
import { setSessionStorageAccessToken } from "@/utils/auth-utils";

function getLoginErrorCode(error: unknown): string | null {
  if (
    error &&
    typeof error === "object" &&
    "errorCode" in error &&
    typeof (error as { errorCode: unknown }).errorCode === "string"
  ) {
    return (error as { errorCode: string }).errorCode;
  }
  return null;
}

export function useLogin(baseUrl: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mutation = useMutation({
    mutationFn: (credentials: UserInput) => login(credentials, baseUrl),
    onSuccess: (response) => {
      // Store accessToken from login response in sessionStorage
      // This avoids a race condition where AuthProvider calls /auth/refresh
      // before the browser has processed the Set-Cookie header
      if (response && typeof response === "object" && "accessToken" in response) {
        const accessToken = response.accessToken as string;
        if (accessToken) {
          setSessionStorageAccessToken(accessToken);
        }
      }
      const from = searchParams.get("from");
      const target = from && from.startsWith("/") ? from : "/sessions";
      router.replace(target);
    },
  });

  const errorMessage = useMemo(() => {
    const err = mutation.error;
    if (!err) return null;
    return err instanceof Error ? err.message : "Login failed";
  }, [mutation.error]);

  const errorCode = useMemo(
    () => getLoginErrorCode(mutation.error),
    [mutation.error],
  );

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: errorMessage,
    errorCode,
  };
}
