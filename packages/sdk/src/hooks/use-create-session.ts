import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSession, sessionsQueryKeys } from "../api";
import { SessionInsert } from "@drum-scheduler/contracts";

export function useCreateSession(
  baseUrl: string,
  options?: { accessToken?: string | null }
) {
  const queryClient = useQueryClient();
  const accessToken = options?.accessToken ?? null;

  return useMutation({
    mutationFn: (session: SessionInsert) =>
      createSession(baseUrl, session, { accessToken: accessToken ?? undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.all,
      });
    },
  });
}
