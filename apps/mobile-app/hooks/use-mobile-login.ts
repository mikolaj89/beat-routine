import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import type { UserInput } from "@drum-scheduler/contracts";
import { mobileLogin } from "../api/mobile-auth";
import { setRefreshTokenInStorage } from "../utils/auth-storage";

export function useMobileLogin(baseUrl: string) {
  const mutation = useMutation({
    mutationFn: async (credentials: UserInput) => {
      const response = await mobileLogin(credentials, baseUrl);

      if (!response.refreshToken) {
        throw new Error("UNAUTHORIZED");
      }

      await setRefreshTokenInStorage(response.refreshToken);
      return response;
    },
  });

  const error = useMemo(() => {
    if (!mutation.error) {
      return null;
    }

    return mutation.error instanceof Error ? mutation.error.message : "Login failed";
  }, [mutation.error]);

  return {
    login: mutation.mutateAsync,
    isPending: mutation.isPending,
    error,
  };
}
