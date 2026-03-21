import { ApiClient } from "../api-client";
import { authHeaders } from "../utils/auth-headers";
import type { SessionWithExercises } from "./session-types";

export const addExerciseToSession = async ({
  baseUrl,
  accessToken,
  sessionId,
  exerciseId,
}: {
  baseUrl: string;
  accessToken?: string;
  sessionId: number;
  exerciseId: string;
}) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(accessToken));
  const result = await apiClient.post<SessionWithExercises>(
    `/sessions/${sessionId}/exercises/${exerciseId}`,
    {},
  );

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  return result;
};
