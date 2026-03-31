import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { signAccessToken, verifyAccessToken } from "./auth-tokens";

const ORIGINAL_JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const ORIGINAL_ACCESS_TOKEN_TTL_SECONDS = process.env.ACCESS_TOKEN_TTL_SECONDS;

describe("auth-tokens", () => {
  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET = "test-access-secret";
    process.env.ACCESS_TOKEN_TTL_SECONDS = "900";
  });

  afterEach(() => {
    if (ORIGINAL_JWT_ACCESS_SECRET === undefined) {
      delete process.env.JWT_ACCESS_SECRET;
    } else {
      process.env.JWT_ACCESS_SECRET = ORIGINAL_JWT_ACCESS_SECRET;
    }

    if (ORIGINAL_ACCESS_TOKEN_TTL_SECONDS === undefined) {
      delete process.env.ACCESS_TOKEN_TTL_SECONDS;
    } else {
      process.env.ACCESS_TOKEN_TTL_SECONDS = ORIGINAL_ACCESS_TOKEN_TTL_SECONDS;
    }
  });

  it("verifies a token signed with signAccessToken", async () => {
    const token = await signAccessToken({
      userId: "user-1",
      accountId: "account-1",
      role: "ADMIN",
    });

    await expect(verifyAccessToken(token)).resolves.toEqual({
      userId: "user-1",
      accountId: "account-1",
      role: "ADMIN",
    });
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await signAccessToken({
      userId: "user-1",
      accountId: "account-1",
      role: "USER",
    });

    process.env.JWT_ACCESS_SECRET = "different-test-secret";

    await expect(verifyAccessToken(token)).rejects.toThrow();
  });

  it("throws when JWT_ACCESS_SECRET is missing", async () => {
    delete process.env.JWT_ACCESS_SECRET;

    await expect(verifyAccessToken("any-token")).rejects.toThrow(
      "Missing JWT_ACCESS_SECRET"
    );
  });
});
