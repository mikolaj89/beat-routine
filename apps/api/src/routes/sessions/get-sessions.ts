import type { FastifyReply, FastifyRequest } from "fastify";
import { filterSessionsDB } from "../../db/sessions";
import { getFormattedErrorBody } from "../../utils/response";

type SessionsQuery = {
  query?: string;
};

export const getSessions = async (
  request: FastifyRequest<{ Querystring: SessionsQuery }>,
  reply: FastifyReply,
) => {
  try {
    const { query } = request.query ?? {};
    const result = await filterSessionsDB(query ?? null);

    reply.status(200).send({ data: result });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    reply
      .status(500)
      .send(
        getFormattedErrorBody(
          "Failed to fetch sessions",
          "INTERNAL_SERVER_ERROR",
        ),
      );
  }
};
