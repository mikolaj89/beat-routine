import { useQuery } from "@tanstack/react-query";
import {
  Session
} from "@drum-scheduler/contracts";
import { ApiClient } from "./api-client.js";

export const sessionsQueryKeys = {
  all: ["sessions"] as const,
};

export const fetchSessions = async (baseUrl: string) => {
  const apiClient = new ApiClient(baseUrl);
  const result = await apiClient.get<Session[]>("/sessions");

  if ("error" in result) {
    console.error(result.error);
    return null;
  }
  return result.data;
};



export function useSessionsQuery(baseUrl: string) { 
  const result = useQuery({
    queryKey: sessionsQueryKeys.all,
    queryFn: () => fetchSessions(baseUrl),
  });

  return result;
}
