import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@drum-scheduler/contracts";
import { fetchSessions, sessionsQueryKeys } from "../api";

export function useSessionsQuery(
  baseUrl: string,
  options?: {
    initialData?: Session[];
    refetchOnMount?: boolean;
    accessToken?: string | null;
    query?: string | null;
    debounceMs?: number;
  },
) {
  const accessToken = options?.accessToken ?? null;
  const query = options?.query ?? null;
  const debounceMs = options?.debounceMs ?? 0;
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    if (!debounceMs) {
      setDebouncedQuery(query);
      return;
    }

    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [debounceMs, query]);

  return useQuery({
    queryKey: [...sessionsQueryKeys.all, accessToken, debouncedQuery],
    queryFn: () =>
      fetchSessions(baseUrl, {
        accessToken: accessToken ?? undefined,
        query: debouncedQuery,
      }),
    initialData: options?.initialData,
    refetchOnMount: options?.refetchOnMount ?? true,
    enabled: Boolean(accessToken),
  });
}
