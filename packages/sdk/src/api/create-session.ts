import { Session, SessionInsert } from "@drum-scheduler/contracts";
import { ApiClient } from "../api-client";
import { authHeaders, type RequestOptions } from "../utils/auth-headers";
import type { CreateSessionResponse } from "./session-types";

export const createSession = async (
  baseUrl: string,
  session: SessionInsert,
  options?: RequestOptions
) => {
  const apiClient = new ApiClient(baseUrl, authHeaders(options?.accessToken));
  const result = await apiClient.post<CreateSessionResponse>(
    "/sessions",
    session
  );

  if ("error" in result) {
    throw new Error(result.error.message);
  }

  return result;
};
