import type { FastifyReply, FastifyRequest } from "fastify";
import { verifyAccessToken } from "../utils/auth-tokens";
import { getFormattedErrorBody } from "../utils/response";

export async function requireAuth(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const raw = request.headers.authorization;
  if (!raw || typeof raw !== "string" || !raw.startsWith("Bearer ")) {
    await reply
      .code(401)
      .send(getFormattedErrorBody("Missing or invalid Authorization header", "UNAUTHORIZED"));
    return;
  }

  const token = raw.slice(7).trim();
  if (!token) {
    await reply
      .code(401)
      .send(getFormattedErrorBody("Missing or invalid Authorization header", "UNAUTHORIZED"));
    return;
  }

  try {
    const payload = await verifyAccessToken(token);
    request.auth = payload;
  } catch {
    await reply
      .code(401)
      .send(getFormattedErrorBody("Invalid or expired token", "UNAUTHORIZED"));
  }
}
