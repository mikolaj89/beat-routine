import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthSession } from "./use-auth-session";
import { useRefresh } from "@/hooks/use-refresh";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config/globals";

vi.mock("@/hooks/use-refresh", () => ({
  useRefresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe("useAuthSession", () => {
  const replaceMock = vi.fn();
  const refreshMutateMock = vi.fn();
  let mockAccessToken: string | null | undefined = undefined;
  let mockError: string | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    refreshMutateMock.mockReset();
    refreshMutateMock.mockResolvedValue({ accessToken: null });
    sessionStorage.clear();
    mockAccessToken = undefined;
    mockError = null;

    vi.mocked(useRouter).mockReturnValue({
      replace: replaceMock,
    } as never);
    vi.mocked(usePathname).mockReturnValue("/sessions");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("view=calendar") as never,
    );
    vi.mocked(useRefresh).mockImplementation(() => ({
      refresh: refreshMutateMock,
      isPending: false,
      accessToken: mockAccessToken,
      error: mockError,
      isUnauthorized: (mockError === "UNAUTHORIZED" || mockError?.includes("UNAUTHORIZED")) ?? false,
    }));
  });

  it("hydrates access token from sessionStorage and still triggers refresh", async () => {
    sessionStorage.setItem("auth.accessToken", "stored-token");

    const { result } = renderHook(() => useAuthSession(API_BASE_URL));

    await waitFor(() => {
      expect(result.current.accessToken).toBe("stored-token");
    });

    await waitFor(() => {
      expect(refreshMutateMock).toHaveBeenCalledTimes(1);
    });
  });

  it("calls refresh on init when no stored token and sets access token", async () => {
    refreshMutateMock.mockImplementation(async () => {
      mockAccessToken = "fresh-token";
      vi.mocked(useRefresh).mockImplementation(() => ({
        refresh: refreshMutateMock,
        isPending: false,
        accessToken: mockAccessToken,
        error: mockError,
        isUnauthorized: (mockError === "UNAUTHORIZED" || mockError?.includes("UNAUTHORIZED")) ?? false,
      }));

      return { accessToken: "fresh-token" };
    });

    const { result, rerender } = renderHook(() => useAuthSession(API_BASE_URL));

    await waitFor(() => {
      expect(refreshMutateMock).toHaveBeenCalledTimes(1);
    });

    rerender();

    await waitFor(() => {
      expect(result.current.accessToken).toBe("fresh-token");
    });
  });

  it("redirects to login with from query when refresh returns unauthorized", async () => {
    // Start without a token in sessionStorage to simulate a refresh attempt
    const { result, rerender } = renderHook(() => useAuthSession(API_BASE_URL));

    // Wait for initial refresh attempt
    await waitFor(() => {
      expect(refreshMutateMock).toHaveBeenCalled();
    });

    // Simulate error from refresh mutation - update mock to return error state
    mockError = "UNAUTHORIZED";
    mockAccessToken = undefined;
    
    vi.mocked(useRefresh).mockImplementation(() => ({
      refresh: refreshMutateMock,
      isPending: false,
      accessToken: mockAccessToken,
      error: mockError,
      isUnauthorized: true,
    }));

    // Rerender to trigger the error effect
    rerender();

    await waitFor(() => {
      expect(result.current.accessToken).toBeNull();
      expect(replaceMock).toHaveBeenCalledWith(
        "/login?from=%2Fsessions%3Fview%3Dcalendar",
      );
    });
  });

});
