import type { CurrentUser } from "@drum-scheduler/contracts";
import { ApiClient } from "../api-client";
import { authHeaders, type RequestOptions } from "../utils/auth-headers";

export const fetchCurrentUser = async (
  baseUrl: string,
  options?: RequestOptions,
) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(options?.accessToken));
  const result = await apiClient.get<CurrentUser>("/auth/me");

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  if (result.data == null) {
    throw new Error("Empty response");
  }

  return result.data;
};
