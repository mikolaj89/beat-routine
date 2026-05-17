import type { LoginResponse, RefreshResponse, UserInput } from "@drum-scheduler/contracts";
import { ApiClient } from "@drum-scheduler/sdk";

const MOBILE_CLIENT_HEADERS = {
  "X-Client": "mobile",
};

export async function mobileLogin(
  credentials: UserInput,
  baseUrl: string,
): Promise<LoginResponse> {
  const client = new ApiClient(baseUrl);
  const result = await client.post<LoginResponse>(
    "/auth/login",
    credentials,
    MOBILE_CLIENT_HEADERS,
  );

  if ("error" in result) {
    console.error("[mobile-auth] POST /auth/login API error", result.error);
    throw new Error(result.error.message);
  }

  if (!result.data) {
    console.error("[mobile-auth] POST /auth/login empty data");
    throw new Error("Empty login response");
  }

  return result.data;
}

export async function mobileRefresh(
  refreshToken: string,
  baseUrl: string,
): Promise<RefreshResponse> {
  const client = new ApiClient(baseUrl);
  const result = await client.post<RefreshResponse>(
    "/auth/refresh",
    { refreshToken },
    MOBILE_CLIENT_HEADERS,
  );

  if ("error" in result) {
    console.error("[mobile-auth] POST /auth/refresh API error", result.error);
    throw new Error(result.error.errorCode);
  }

  if (!result.data) {
    console.error("[mobile-auth] POST /auth/refresh empty data");
    throw new Error("Empty refresh response");
  }

  return result.data;
}
