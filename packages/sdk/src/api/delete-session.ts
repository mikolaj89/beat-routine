import { ApiClient } from "../api-client";
import { authHeaders, type RequestOptions } from "../utils/auth-headers";

export const deleteSession = async (
  baseUrl: string,
  sessionId: number,
  options?: RequestOptions
) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(options?.accessToken));
  const result = await apiClient.delete<null>(`/sessions/${sessionId}`);

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  return result.data;
};
