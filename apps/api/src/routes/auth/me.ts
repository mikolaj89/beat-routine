import type { FastifyReply, FastifyRequest } from "fastify";
import { getUserById } from "../../db/users";
import { getFormattedErrorBody } from "../../utils/response";

export const getCurrentUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const userId = request.auth?.userId;

    if (!userId) {
      return reply
        .code(401)
        .send(getFormattedErrorBody("Invalid or expired token", "UNAUTHORIZED"));
    }

    const users = await getUserById(userId);
    const user = users[0];

    if (!user) {
      return reply
        .code(404)
        .send(getFormattedErrorBody("User not found", "NOT_FOUND"));
    }

    if (!user.isActive) {
      return reply
        .code(401)
        .send(getFormattedErrorBody("User is inactive", "UNAUTHORIZED"));
    }

    return reply.code(200).send({
      data: {
        id: user.id,
        accountId: user.accountId,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return reply
      .code(500)
      .send(
        getFormattedErrorBody(
          "Failed to fetch current user",
          "INTERNAL_SERVER_ERROR"
        )
      );
  }
};
