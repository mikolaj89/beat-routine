import { Session } from "@drum-scheduler/contracts";
import { ApiClient } from "../api-client";
import { authHeaders, type RequestOptions } from "../utils/auth-headers";

export const fetchSessions = async (
  baseUrl: string,
  options?: RequestOptions & { query?: string | null }
) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(options?.accessToken));
  const result = await apiClient.get<Session[]>(`/sessions?query=${options?.query ?? ""}`);

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  // In case the server returns an empty body for a GET, keep a stable shape.
  return result.data ?? [];
};
