import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import authRoutes from "../auth";
import { getUserById } from "../../db/users";
import { verifyAccessToken } from "../../utils/auth-tokens";

vi.mock("../../db/users", () => ({
  getUserById: vi.fn(),
}));

vi.mock("../../utils/auth-tokens", () => ({
  verifyAccessToken: vi.fn(),
}));

const getUserByIdMock = vi.mocked(getUserById);
const verifyAccessTokenMock = vi.mocked(verifyAccessToken);

const buildApp = async () => {
  const app = Fastify({ logger: false });
  await app.register(authRoutes);
  return app;
};

describe("GET /auth/me", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    verifyAccessTokenMock.mockResolvedValue({
      userId: "user-1",
      accountId: "account-1",
      role: "ADMIN",
    });
  });

  it("returns 401 when authorization header is missing", async () => {
    const app = await buildApp();

    const res = await app.inject({
      method: "GET",
      url: "/auth/me",
    });

    expect(res.statusCode).toBe(401);
    const body = res.json();
    expect(body.error?.errorCode).toBe("UNAUTHORIZED");

    await app.close();
  });

  it("returns 404 when authenticated user is not found", async () => {
    getUserByIdMock.mockResolvedValue([]);

    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/auth/me",
      headers: { authorization: "Bearer access-token" },
    });

    expect(res.statusCode).toBe(404);
    const body = res.json();
    expect(body.error?.errorCode).toBe("NOT_FOUND");

    await app.close();
  });

  it("returns 401 when authenticated user is inactive", async () => {
    getUserByIdMock.mockResolvedValue([
      {
        id: "user-1",
        accountId: "account-1",
        email: "test@example.com",
        passwordHash: "hash",
        role: "ADMIN",
        isActive: false,
        createdAt: new Date().toISOString(),
      },
    ]);

    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/auth/me",
      headers: { authorization: "Bearer access-token" },
    });

    expect(res.statusCode).toBe(401);
    const body = res.json();
    expect(body.error?.errorCode).toBe("UNAUTHORIZED");

    await app.close();
  });

  it("returns current user account data", async () => {
    const createdAt = new Date().toISOString();
    getUserByIdMock.mockResolvedValue([
      {
        id: "user-1",
        accountId: "account-1",
        email: "test@example.com",
        passwordHash: "hash",
        role: "ADMIN",
        isActive: true,
        createdAt,
      },
    ]);

    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/auth/me",
      headers: { authorization: "Bearer access-token" },
    });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.data).toEqual({
      id: "user-1",
      accountId: "account-1",
      email: "test@example.com",
      role: "ADMIN",
      isActive: true,
      createdAt,
    });

    expect(getUserByIdMock).toHaveBeenCalledWith("user-1");

    await app.close();
  });
});
