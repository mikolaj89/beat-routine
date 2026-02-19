import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession, sessionsQueryKeys } from "../api";

export function useDeleteSession(
  baseUrl: string,
  options?: { accessToken?: string | null }
) {
  const queryClient = useQueryClient();
  const accessToken = options?.accessToken ?? null;

  return useMutation({
    mutationFn: (sessionId: number) =>
      deleteSession(baseUrl, sessionId, { accessToken: accessToken ?? undefined }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.all,
      });
    },
  });
}
