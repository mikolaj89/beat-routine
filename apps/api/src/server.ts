import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import cookie from "@fastify/cookie";
import { loadEnv } from "./config/env";
import { authConfig } from "./config/auth";
import exercisesRoutes from "./routes/exercises";
import sessionsRoutes from "./routes/sessions";
import sessionExercisesRoutes from "./routes/session-exercises";
import categoriesRoutes from "./routes/categories";
import authRoutes from "./routes/auth";

// Load base .env (if present)
dotenv.config();

// Load environment-specific overrides:
// - NODE_ENV=test  -> test.env
// - otherwise      -> local.env (for development)
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: "test.env" });
} else {
  dotenv.config({ path: "local.env" });
}

const env = loadEnv();
const auth = authConfig(env);

const fastify = Fastify({
  logger: false,
});

await fastify.register(cookie);

fastify.decorate("auth", auth);
fastify.decorate("env", env);

fastify.addHook("preSerialization", async (_request, reply, payload) => {
  if (reply.statusCode >= 400 || reply.statusCode === 204) {
    return payload;
  }

  if (
    payload !== null &&
    typeof payload === "object" &&
    ("data" in payload || "error" in payload)
  ) {
    return payload;
  }

  return { data: payload };
});

fastify.addHook("onRequest", async (request) => {
  console.log(`${request.method} ${request.url}`);
});

await fastify.register(cors, {
  origin: env.CORS_ORIGIN,
  credentials: true,
});

fastify.get("/health", async () => ({ ok: true }));

fastify.get("/version", async () => ({
  APP_GIT_SHA: process.env.APP_GIT_SHA,
  APP_DEPLOYED_AT: process.env.APP_DEPLOYED_AT,
}));

await fastify.register(exercisesRoutes);
await fastify.register(sessionsRoutes);
await fastify.register(sessionExercisesRoutes);
await fastify.register(categoriesRoutes);
await fastify.register(authRoutes);

const PORT = env.PORT;
const HOST = env.HOST;
const baseUrl = env.API_BASE_URL ?? `http://${HOST}:${PORT}`;

fastify.listen({ port: PORT, host: HOST }).then(() => {
  console.log(`Server is running on ${baseUrl}`);
});
