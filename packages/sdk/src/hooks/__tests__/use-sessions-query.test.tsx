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
    });
  });

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
