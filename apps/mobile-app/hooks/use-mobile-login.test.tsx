import React, { type PropsWithChildren } from "react";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMobileLogin } from "./use-mobile-login";
import { mobileLogin } from "../api/mobile-auth";
import { setRefreshTokenInStorage } from "../utils/auth-storage";

jest.mock("../api/mobile-auth", () => ({
  mobileLogin: jest.fn(),
}));

jest.mock("../utils/auth-storage", () => ({
  setRefreshTokenInStorage: jest.fn(),
}));

const mockedMobileLogin = mobileLogin as jest.MockedFunction<typeof mobileLogin>;
const mockedSetRefreshToken = setRefreshTokenInStorage as jest.MockedFunction<
  typeof setRefreshTokenInStorage
>;

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

describe("useMobileLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("stores refresh token after successful login", async () => {
    mockedMobileLogin.mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: { id: "1", accountId: "account-1", role: "USER" },
    });

    const { result } = renderHook(() => useMobileLogin("http://localhost:8000"), {
      wrapper: createWrapper(),
    });

    // initial state
    expect(result.current.isPending).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.login).toBe("function");

    await act(async () => {
      const response = await result.current.login({
        email: "john@example.com",
        password: "secret",
      });
      expect(response.accessToken).toBe("access-token");
    });

    expect(mockedMobileLogin).toHaveBeenCalledWith(
      { email: "john@example.com", password: "secret" },
      "http://localhost:8000",
    );
    expect(mockedSetRefreshToken).toHaveBeenCalledWith("refresh-token");

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("fails when backend does not return refresh token", async () => {
    mockedMobileLogin.mockResolvedValue({
      accessToken: "access-token",
      user: { id: "1", accountId: "account-1", role: "USER" },
    });

    const { result } = renderHook(() => useMobileLogin("http://localhost:8000"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await expect(
        result.current.login({
          email: "john@example.com",
          password: "secret",
        }),
      ).rejects.toThrow("UNAUTHORIZED");
    });

    expect(mockedSetRefreshToken).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
      expect(result.current.error).toBe("UNAUTHORIZED");
    });
  });
});
