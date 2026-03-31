import type { CurrentUser } from "@drum-scheduler/contracts";
import { useQuery } from "@tanstack/react-query";
import { authQueryKeys, fetchCurrentUser } from "../api";

export function useFetchCurrentUser(
  baseUrl: string,
  options?: {
    initialData?: CurrentUser;
    refetchOnMount?: boolean;
    accessToken?: string | null;
  },
) {
  const accessToken = options?.accessToken ?? null;

  return useQuery({
    queryKey: [...authQueryKeys.currentUser, accessToken],
    queryFn: () =>
      fetchCurrentUser(baseUrl, {
        accessToken: accessToken ?? undefined,
      }),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
    enabled: Boolean(accessToken),
  });
}
