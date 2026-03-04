import { renderHook, waitFor } from "@testing-library/react-native";
import { useMobileAuthSession } from "./use-mobile-auth-session";
import { useMobileRefresh } from "./use-mobile-refresh";
import { useMobileLogin } from "./use-mobile-login";
import { clearAuthTokensInStorage } from "../utils/auth-storage";

jest.mock("./use-mobile-refresh", () => ({
  useMobileRefresh: jest.fn(),
}));

jest.mock("./use-mobile-login", () => ({
  useMobileLogin: jest.fn(),
}));

jest.mock("../utils/auth-storage", () => ({
  clearAuthTokensInStorage: jest.fn(),
}));

const mockedUseMobileRefresh = useMobileRefresh as jest.MockedFunction<
  typeof useMobileRefresh
>;
const mockedUseMobileLogin = useMobileLogin as jest.MockedFunction<
  typeof useMobileLogin
>;
const mockedClearAuthTokens = clearAuthTokensInStorage as jest.MockedFunction<
  typeof clearAuthTokensInStorage
>;

describe("useMobileAuthSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseMobileLogin.mockReturnValue({
      login: jest.fn(),
      isPending: false,
      error: null,
    });
  });

  it("bootstraps session from refresh on mount", async () => {
    const refresh = jest.fn().mockResolvedValue({ accessToken: "access-token" });

    mockedUseMobileRefresh.mockReturnValue({
      accessToken: undefined,
      refresh,
      isPending: false,
      error: null,
      isUnauthorized: false,
    });

    const { result } = renderHook(() =>
      useMobileAuthSession("http://localhost:8000"),
    );

    // After bootstrap, auth state should reflect refreshed token
    await waitFor(() => {
      expect(result.current.accessToken).toBe("access-token");
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isRefreshing).toBe(false);
      expect(result.current.isLoginPending).toBe(false);
      expect(result.current.loginError).toBeNull();
      expect(typeof result.current.login).toBe("function");
      expect(typeof result.current.refresh).toBe("function");
      expect(typeof result.current.logout).toBe("function");
    });
  });

  it("clears auth state when bootstrap refresh fails", async () => {
    const refresh = jest.fn().mockRejectedValue(new Error("UNAUTHORIZED"));

    mockedUseMobileRefresh.mockReturnValue({
      accessToken: undefined,
      refresh,
      isPending: false,
      error: null,
      isUnauthorized: true,
    });

    const { result } = renderHook(() =>
      useMobileAuthSession("http://localhost:8000"),
    );

    await waitFor(() => {
      expect(mockedClearAuthTokens).toHaveBeenCalled();
      expect(result.current.accessToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  it("sets access token and flags after successful login", async () => {
    const refresh = jest.fn().mockResolvedValue({ accessToken: null });
    mockedUseMobileRefresh.mockReturnValue({
      accessToken: undefined,
      refresh,
      isPending: false,
      error: null,
      isUnauthorized: false,
    });

    const login = jest.fn().mockResolvedValue({
      accessToken: "access-from-login",
      refreshToken: "refresh-token",
      user: { id: "1", accountId: "account-1", role: "USER" },
    });
    mockedUseMobileLogin.mockReturnValue({
      login,
      isPending: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useMobileAuthSession("http://localhost:8000"),
    );

    // After bootstrap refresh with null token, still unauthenticated
    await waitFor(() => {
      expect(result.current.accessToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    await result.current.login({
      email: "john@example.com",
      password: "secret",
    });


    //after login, auth state should reflect login result
    await waitFor(() => {
      expect(result.current.accessToken).toBe("access-from-login");
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoginPending).toBe(false);
      expect(result.current.loginError).toBeNull();
    });
  });
});
