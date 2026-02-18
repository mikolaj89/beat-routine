import { ApiClient } from "../api-client";
import { RefreshResponse } from "@drum-scheduler/contracts"


export async function refreshAccessTokenPOST(baseUrl: string) {
  const client = new ApiClient(baseUrl);
  return client.post<RefreshResponse>("/auth/refresh");
}
