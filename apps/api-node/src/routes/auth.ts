import type { FastifyInstance } from "fastify";
import { login } from "./auth/login";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/login", login);
}
