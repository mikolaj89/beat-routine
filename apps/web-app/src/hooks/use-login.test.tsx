import React, { PropsWithChildren } from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLogin } from "./use-login";
import { login } from "@drum-scheduler/sdk";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/config/globals";

vi.mock("@drum-scheduler/sdk", () => ({
  login: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
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

describe("useLogin", () => {
  const replaceMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    vi.mocked(useRouter).mockReturnValue({
      replace: replaceMock,
    } as never);
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
  });

  it("stores access token and redirects to safe from path", async () => {
    vi.mocked(login).mockResolvedValue({ accessToken: "token-123" } as never);
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("from=/exercises") as never,
    );

    const { result } = renderHook(
      () => useLogin(API_BASE_URL),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.mutate({
        email: "user@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(
        { email: "user@example.com", password: "password123" },
        API_BASE_URL,
      );
    });
    await waitFor(() => {
      expect(sessionStorage.getItem("auth.accessToken")).toBe("token-123");
      expect(replaceMock).toHaveBeenCalledWith("/exercises");
    });
  });

  it("falls back to /sessions when from is missing or invalid", async () => {
    vi.mocked(login).mockResolvedValue({ accessToken: "token-abc" } as never);
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("from=not-a-path") as never,
    );

    const { result } = renderHook(
      () => useLogin(API_BASE_URL),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.mutate({
        email: "user@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/sessions");
    });
  });

  it("maps mutation errors to a user-facing error string", async () => {
    vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(
      () => useLogin(API_BASE_URL),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.mutate({
        email: "user@example.com",
        password: "wrong-password",
      });
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Invalid credentials");
    });
  });
});
