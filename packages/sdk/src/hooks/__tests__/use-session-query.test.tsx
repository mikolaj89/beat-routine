import React from 'react';
import { afterEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

const mockSession = {
  id: 123,
  name: "Test Session",
  notes: null,
  totalDuration: 42,
  exercises: [],
};

const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
  const url = typeof input === "string" ? input : input.toString();

  if (url.includes("/sessions/123")) {
    return {
      ok: true,
      json: async () => ({ data: mockSession }),
    } as Response;
  }

  return {
    ok: false,
    json: async () => ({ error: { message: "Not found", errorCode: "404" } }),
  } as Response;
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("useSessionQuery", () => {
  it("returns mocked session data", async () => {
    vi.stubGlobal("fetch", fetchMock);
    const { useSessionQuery } = await import("../use-session-query");
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    const wrapper = ({ children }: { children?: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useSessionQuery("http://localhost:8000", 123),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSession);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/sessions/123",
      expect.any(Object)
    );
  });

  it("returns error when api responds with error", async () => {
    vi.stubGlobal("fetch", fetchMock);
    const { useSessionQuery } = await import("../use-session-query");
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    const wrapper = ({ children }: { children?: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useSessionQuery("http://localhost:8000", 999),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe("Not found");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/sessions/999",
      expect.any(Object)
    );
  });
});
