import { useQuery } from "@tanstack/react-query";
import type { SessionWithExercises } from "../api";
import { fetchSessionById, sessionsQueryKeys } from "../api";

export function useSessionQuery(
  baseUrl: string,
  sessionId: number,
  options?: {
    initialData?: SessionWithExercises;
    refetchOnMount?: boolean;
    accessToken?: string | null;
  }
) {
  const accessToken = options?.accessToken ?? null;

  return useQuery({
    queryKey: [...sessionsQueryKeys.byId(sessionId), accessToken],
    queryFn: () =>
      fetchSessionById(baseUrl, sessionId, {
        accessToken: accessToken ?? undefined,
      }),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
    enabled: Boolean(accessToken),
  });
}
