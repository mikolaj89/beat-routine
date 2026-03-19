import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  baseUrl,
  createTestQueryClient,
  createWrapper,
  mockSessions,
  sessionsQueryKeys,
} from "./test-utils";

const fetchSessions = vi.fn().mockResolvedValue(mockSessions);

vi.mock("../../api", () => ({
  fetchSessions,
  sessionsQueryKeys,
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("useSessionsQuery", () => {
  it("returns sessions data when accessToken is provided", async () => {
    const { useSessionsQuery } = await import("../use-sessions-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { result } = renderHook(
      () => useSessionsQuery(baseUrl, { accessToken: "token-123" }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockSessions);
    });

    expect(fetchSessions).toHaveBeenCalledWith(baseUrl, {
      accessToken: "token-123",
      query: null,
    });
  });

  it("refetches when the query changes", async () => {
    const { useSessionsQuery } = await import("../use-sessions-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { rerender } = renderHook(
      ({ query }) => useSessionsQuery(baseUrl, { accessToken: "token-123", query }),
      {
        wrapper,
        initialProps: { query: "" },
      }
    );

    await waitFor(() => {
      expect(fetchSessions).toHaveBeenCalledWith(baseUrl, {
        accessToken: "token-123",
        query: "",
      });
    });

    rerender({ query: "rock" });

    await waitFor(() => {
      expect(fetchSessions).toHaveBeenCalledWith(baseUrl, {
        accessToken: "token-123",
        query: "rock",
      });
      expect(fetchSessions).toHaveBeenCalledTimes(2);
    });
  });

  it("debounces query changes when debounceMs is provided", async () => {
    const { useSessionsQuery } = await import("../use-sessions-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { rerender } = renderHook(
      ({ query }) =>
        useSessionsQuery(baseUrl, {
          accessToken: "token-123",
          query,
          debounceMs: 1000,
        }),
      {
        wrapper,
        initialProps: { query: "" },
      }
    );

    await waitFor(() => {
      expect(fetchSessions).toHaveBeenCalledWith(baseUrl, {
        accessToken: "token-123",
        query: "",
      });
    });

    rerender({ query: "rock" });

    await new Promise(resolve => setTimeout(resolve, 999));
    expect(fetchSessions).toHaveBeenCalledTimes(1);

    await new Promise(resolve => setTimeout(resolve, 100));

    await waitFor(() => {
      expect(fetchSessions).toHaveBeenCalledWith(baseUrl, {
        accessToken: "token-123",
        query: "rock",
      });
      expect(fetchSessions).toHaveBeenCalledTimes(2);
    });
  }, 10000);

  it("does not run query when accessToken is missing", async () => {
    const { useSessionsQuery } = await import("../use-sessions-query");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    renderHook(() => useSessionsQuery(baseUrl), { wrapper });

    await waitFor(() => {
      expect(fetchSessions).not.toHaveBeenCalled();
    });
  });
});
