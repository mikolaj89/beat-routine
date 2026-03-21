import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExerciseToSession, sessionsQueryKeys } from "../api";

export function useAddExerciseToSession({
  baseUrl,
  sessionId,
  accessToken,
}: {
  baseUrl: string;
  sessionId: number;
  accessToken?: string | null;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exerciseId: string) =>
      addExerciseToSession({
        baseUrl,
        accessToken: accessToken ?? undefined,
        sessionId,
        exerciseId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionsQueryKeys.byId(sessionId),
      });
    },
  });
}
