import { useMutation } from "@tanstack/react-query";
import { mobileRefresh } from "../api/mobile-auth";
import { getRefreshTokenFromStorage, setRefreshTokenInStorage } from "../utils/auth-storage";

type RefreshResult = {
  accessToken: string | null;
};

export function useMobileRefresh(baseUrl: string) {
  const { mutateAsync, isPending, data, error } = useMutation({
    mutationFn: async (): Promise<RefreshResult> => {
      const refreshToken = await getRefreshTokenFromStorage();

      if (!refreshToken) {
        throw new Error("UNAUTHORIZED");
      }

      const response = await mobileRefresh(refreshToken, baseUrl);

      if (response.refreshToken) {
        await setRefreshTokenInStorage(response.refreshToken);
      }

      return {
        accessToken: response.accessToken ?? null,
      };
    },
  });

  console.log({isPending, error, data});

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
