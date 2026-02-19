import React, { PropsWithChildren } from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRefresh } from "./use-refresh";
import { refreshAccessTokenPOST } from "@drum-scheduler/sdk";
import { API_BASE_URL } from "@/config/globals";

vi.mock("@drum-scheduler/sdk", () => ({
  refreshAccessTokenPOST: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useRefresh", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls sdk refresh and resolves with access token", async () => {
    vi.mocked(refreshAccessTokenPOST).mockResolvedValue({
      data: { accessToken: "refreshed-token" },
    });

    const { result } = renderHook(
      () => useRefresh(API_BASE_URL),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      const data = await result.current.refresh();
      expect(data).toEqual({
        accessToken: "refreshed-token",
      });
    });

    await waitFor(() => {
      expect(result.current.accessToken).toBe("refreshed-token");
    });

    expect(refreshAccessTokenPOST).toHaveBeenCalledWith(API_BASE_URL);
  });

  it("maps refresh error to hook error field and sets isUnauthorized", async () => {
    vi.mocked(refreshAccessTokenPOST).mockResolvedValue({
      error: {
        errorCode: "UNAUTHORIZED",
        message: "Invalid refresh token",
      },
    });

    const { result } = renderHook(
      () => useRefresh(API_BASE_URL),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      try {
        await result.current.refresh();
      } catch (error) {
        // Mutation throws error, which is expected
        expect(error).toBeInstanceOf(Error);
      }
    });

    await waitFor(() => {
      expect(result.current.error).toBe("UNAUTHORIZED");
      expect(result.current.isUnauthorized).toBe(true);
      expect(result.current.accessToken).toBeUndefined();
    });
  });
});
