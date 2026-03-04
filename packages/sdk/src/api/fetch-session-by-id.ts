import { ApiClient } from "../api-client";
import { authHeaders, type RequestOptions } from "../utils/auth-headers";
import type { SessionWithExercises } from "./session-types";

export const fetchSessionById = async (
  baseUrl: string,
  sessionId: number,
  options?: RequestOptions,
) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(options?.accessToken));
  const result = await apiClient.get<SessionWithExercises>(
    `/sessions/${sessionId}`
  );

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  if (result.data == null) {
    throw new Error("Empty response");
  }

  return result.data;
};
