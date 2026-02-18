"use client";

import { useMutation } from "@tanstack/react-query";
import { refreshAccessTokenPOST } from "@drum-scheduler/sdk";

export function useRefresh(baseUrl: string) {
  const { mutateAsync, isPending, data, error } = useMutation({
    mutationFn: async () => {
      const response = await refreshAccessTokenPOST(baseUrl);

      if ("error" in response) {
        throw new Error(response.error.errorCode);
      }

      return {
        accessToken: response.data?.accessToken ?? null,
      };
    },
  });

  // Extract error message string and detect unauthorized errors
  const errorMessage =
    error instanceof Error ? error.message : error ? String(error) : null;
  const isUnauthorized =
    (errorMessage === "UNAUTHORIZED" ||
      errorMessage?.includes("UNAUTHORIZED")) ??
    false;

  return {
    accessToken: data?.accessToken ?? null,
    mutate: mutateAsync,
    isPending,
    error: errorMessage,
    isUnauthorized,
  };
}
