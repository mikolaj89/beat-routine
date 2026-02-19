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

  const errorMessage = error instanceof Error ? error.message : null;
  const isUnauthorized = Boolean(
    errorMessage && errorMessage.includes("UNAUTHORIZED"),
  );

  return {
    accessToken: data?.accessToken,
    refresh: mutateAsync,
    isPending,
    error: errorMessage,
    isUnauthorized,
  };
}
