import Fastify from "fastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import sessionsRoutes from "../../sessions";
import { getSessions as getSessionsDb } from "../../../db/sessions";
import { verifyAccessToken } from "../../../utils/auth-tokens";

vi.mock("../../../db/sessions", () => ({
  getSessions: vi.fn(),
}));

vi.mock("../../../utils/auth-tokens", () => ({
  verifyAccessToken: vi.fn(),
}));

const getSessionsMock = vi.mocked(getSessionsDb);
const verifyAccessTokenMock = vi.mocked(verifyAccessToken);

const buildApp = async () => {
  const app = Fastify({ logger: false });
  await app.register(sessionsRoutes);
  return app;
};

describe("sessions routes auth", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getSessionsMock.mockResolvedValue([]);
    verifyAccessTokenMock.mockResolvedValue({
      userId: "user-1",
      accountId: "account-1",
      role: "USER",
    });
  });

  it("GET /sessions without Authorization returns 401", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/sessions",
    });

    expect(res.statusCode).toBe(401);
    const body = res.json();
    expect(body.error?.errorCode).toBe("UNAUTHORIZED");
    expect(body.error?.message).toContain("Authorization");
    expect(verifyAccessTokenMock).not.toHaveBeenCalled();

    await app.close();
  });

  it("GET /sessions with invalid token returns 401", async () => {
    verifyAccessTokenMock.mockRejectedValueOnce(new Error("Invalid token"));

    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/sessions",
      headers: { authorization: "Bearer invalid-token" },
    });

    expect(res.statusCode).toBe(401);
    const body = res.json();
    expect(body.error?.errorCode).toBe("UNAUTHORIZED");
    expect(body.error?.message).toContain("Invalid or expired");

    await app.close();
  });

  it("GET /sessions with valid Bearer token returns 200", async () => {
    const app = await buildApp();
    const res = await app.inject({
      method: "GET",
      url: "/sessions",
      headers: { authorization: "Bearer valid-access-token" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ data: [] });
    expect(verifyAccessTokenMock).toHaveBeenCalledWith("valid-access-token");
    expect(getSessionsMock).toHaveBeenCalled();

    await app.close();
  });
});
