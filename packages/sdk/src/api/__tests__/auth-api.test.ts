import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchCurrentUser } from "../index";
import { baseUrl, createFetchMock } from "./test-utils";

const mockCurrentUser = {
  id: "user-1",
  accountId: "account-1",
  email: "test@example.com",
  role: "ADMIN",
  isActive: true,
  createdAt: "2026-03-31T00:00:00.000Z",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("auth api", () => {
  it("fetchCurrentUser returns data", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/auth/me`,
        response: { data: mockCurrentUser },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchCurrentUser(baseUrl, {
      accessToken: "token-123",
    });

    expect(result).toEqual(mockCurrentUser);

    const [, init] = fetchMock.mock.calls[0];
    expect(init).toEqual(
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: "Bearer token-123",
        }),
      }),
    );
  });

  it("fetchCurrentUser throws on error response", async () => {
    const fetchMock = createFetchMock([
      {
        url: `${baseUrl}/auth/me`,
        ok: false,
        response: {
          error: {
            message: "Invalid or expired token",
            errorCode: "UNAUTHORIZED",
          },
        },
      },
    ]);
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      fetchCurrentUser(baseUrl, {
        accessToken: "token-123",
      }),
    ).rejects.toThrow("Invalid or expired token");
  });
});
