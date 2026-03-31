import type { FastifyInstance } from "fastify";
import { login } from "./auth/login";
import { refresh } from "./auth/refresh";
import { logout } from "./auth/logout";
import { requireAuth } from "../api-hooks/require-auth";
import { getCurrentUser } from "./auth/me";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/login", login);
  fastify.post("/auth/refresh", refresh);
  fastify.post("/auth/logout", logout);
  fastify.get("/auth/me", { preHandler: requireAuth }, getCurrentUser);
}
