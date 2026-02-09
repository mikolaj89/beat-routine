import { vi } from "vitest";

export const baseUrl = "http://localhost:8000";

export type MockRoute = {
  url: string;
  method?: string;
  ok?: boolean;
  response: unknown;
};

export const createFetchMock = (routes: MockRoute[]) =>
  vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const method = init?.method ?? "GET";
    const route = routes.find(
      (item) => item.url === url && (item.method ?? "GET") === method
    );

    if (!route) {
      return {
        ok: false,
        json: async () => ({
          error: { message: "Not found", errorCode: "NOT_FOUND" },
        }),
      } as Response;
    }

    return {
      ok: route.ok ?? true,
      json: async () => route.response,
    } as Response;
  });

export const getRequestBody = (init?: RequestInit) => {
  if (!init?.body) {
    return null;
  }
  return JSON.parse(String(init.body));
};
