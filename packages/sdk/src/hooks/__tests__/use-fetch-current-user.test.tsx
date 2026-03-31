import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { baseUrl, createTestQueryClient, createWrapper } from "./test-utils";

const mockCurrentUser = {
  id: "user-1",
  accountId: "account-1",
  email: "test@example.com",
  role: "ADMIN",
  isActive: true,
  createdAt: "2026-03-31T00:00:00.000Z",
};

const fetchCurrentUser = vi.fn().mockResolvedValue(mockCurrentUser);
const authQueryKeys = {
  currentUser: ["auth", "current-user"] as const,
};

vi.mock("../../api", () => ({
  fetchCurrentUser,
  authQueryKeys,
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("useFetchCurrentUser", () => {
  it("returns current user when accessToken is provided", async () => {
    const { useFetchCurrentUser } = await import("../use-fetch-current-user");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    const { result } = renderHook(
      () => useFetchCurrentUser(baseUrl, { accessToken: "token-123" }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockCurrentUser);
    });

    expect(fetchCurrentUser).toHaveBeenCalledWith(baseUrl, {
      accessToken: "token-123",
    });
  });

  it("does not run query when accessToken is missing", async () => {
    const { useFetchCurrentUser } = await import("../use-fetch-current-user");
    const queryClient = createTestQueryClient();
    const wrapper = createWrapper(queryClient);

    renderHook(() => useFetchCurrentUser(baseUrl), { wrapper });

    await waitFor(() => {
      expect(fetchCurrentUser).not.toHaveBeenCalled();
    });
  });
});
