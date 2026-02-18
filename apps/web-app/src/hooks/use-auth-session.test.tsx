import { renderHook, waitFor, act } from "@testing-library/react";
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
  let mockAccessToken: string | null = null;
  let mockError: string | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    mockAccessToken = null;
    mockError = null;

    vi.mocked(useRouter).mockReturnValue({
      replace: replaceMock,
    } as never);
    vi.mocked(usePathname).mockReturnValue("/sessions");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("view=calendar") as never,
    );
    vi.mocked(useRefresh).mockImplementation(() => ({
      mutate: refreshMutateMock,
      isPending: false,
      accessToken: mockAccessToken,
      error: mockError,
      isUnauthorized: (mockError === "UNAUTHORIZED" || mockError?.includes("UNAUTHORIZED")) ?? false,
    }));
  });

  it("hydrates access token from sessionStorage and skips initial refresh", async () => {
    sessionStorage.setItem("auth.accessToken", "stored-token");

    const { result } = renderHook(() => useAuthSession(API_BASE_URL));

    await waitFor(() => {
      expect(result.current.accessToken).toBe("stored-token");
    });
    expect(sessionStorage.getItem("auth.accessToken")).toBeNull();
    expect(refreshMutateMock).not.toHaveBeenCalled();
  });

  it("calls refresh on init when no stored token and sets access token", async () => {
    refreshMutateMock.mockImplementation(async () => {
      // Simulate mutation completing and updating accessToken
      mockAccessToken = "fresh-token";
      // Update the mock implementation to return the new token
      vi.mocked(useRefresh).mockImplementation(() => ({
        mutate: refreshMutateMock,
        isPending: false,
        accessToken: mockAccessToken,
        error: mockError,
        isUnauthorized: (mockError === "UNAUTHORIZED" || mockError?.includes("UNAUTHORIZED")) ?? false,
      }));
      return {
        accessToken: "fresh-token",
        error: null,
        isUnauthorized: false,
      };
    });

    const { result, rerender } = renderHook(() => useAuthSession(API_BASE_URL));

    await waitFor(() => {
      expect(refreshMutateMock).toHaveBeenCalledTimes(1);
    });

    // Trigger rerender to pick up the updated mock
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
    mockAccessToken = null;
    
    vi.mocked(useRefresh).mockImplementation(() => ({
      mutate: refreshMutateMock,
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

  it("clears access token via clearAccessToken", async () => {
    sessionStorage.setItem("auth.accessToken", "token-to-clear");

    const { result } = renderHook(() => useAuthSession(API_BASE_URL));

    await waitFor(() => {
      expect(result.current.accessToken).toBe("token-to-clear");
    });

    act(() => {
      result.current.clearAccessToken();
    });

    expect(result.current.accessToken).toBeNull();
  });
});
