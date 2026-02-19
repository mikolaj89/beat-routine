import { useQuery } from "@tanstack/react-query";
import type { Session } from "@drum-scheduler/contracts";
import { fetchSessions, sessionsQueryKeys } from "../api";

export function useSessionsQuery(
  baseUrl: string,
  options?: {
    initialData?: Session[];
    refetchOnMount?: boolean;
    accessToken?: string | null;
  }
) {
  const accessToken = options?.accessToken ?? null;

  return useQuery({
    queryKey: [...sessionsQueryKeys.all, accessToken],
    queryFn: () => fetchSessions(baseUrl, { accessToken: accessToken ?? undefined }),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
    enabled: Boolean(accessToken),
  });
}
