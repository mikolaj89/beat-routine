import { SignJWT, jwtVerify } from "jose";

export type Role = "OWNER" | "ADMIN" | "USER";

const ROLES: Role[] = ["OWNER", "ADMIN", "USER"];

function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.includes(value as Role);
}

export async function signAccessToken(payload: {
  userId: string;
  accountId: string;
  role: Role;
}) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET");

  const key = new TextEncoder().encode(secret);
  const ttlSeconds = Number(process.env.ACCESS_TOKEN_TTL_SECONDS ?? "900"); // 15min

  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ aid: payload.accountId, role: payload.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.userId)
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(key);
}

export type AccessTokenPayload = {
  userId: string;
  accountId: string;
  role: Role;
};

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET");

  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key);

  const userId = payload.sub;
  const accountId = payload.aid;
  const role = payload.role;

  if (typeof userId !== "string" || !userId) {
    throw new Error("Invalid token: missing sub");
  }
  if (typeof accountId !== "string" || !accountId) {
    throw new Error("Invalid token: missing aid");
  }
  if (!isRole(role)) {
    throw new Error("Invalid token: invalid role");
  }

  return { userId, accountId, role };
}
