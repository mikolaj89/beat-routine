import { db } from "./drizzle";
import {
  exercisesSchema,
  sessionexercisesSchema,
  sessionsSchema,
} from "./schema";
import { eq, ilike, or, sql } from "drizzle-orm";
import type { SessionInput } from "./types";

const buildSessionsQuery = (query?: string | null) => {
  const normalizedQuery = query?.trim();
  const filter = normalizedQuery
    ? or(
        ilike(sessionsSchema.name, `%${normalizedQuery}%`),
        ilike(sessionsSchema.notes, `%${normalizedQuery}%`)
      )
    : undefined;

  // Derive totalDuration from the session's exercises.
  // Prefer per-session override duration (sessionexercises.durationMinutes),
  // falling back to the base exercise duration (exercises.durationMinutes).
  return db
    .select({
      id: sessionsSchema.id,
      name: sessionsSchema.name,
      sessionDate: sessionsSchema.sessionDate,
      notes: sessionsSchema.notes,
      createdAt: sessionsSchema.createdAt,
      totalDuration:
        sql<number>`COALESCE(SUM(COALESCE(${sessionexercisesSchema.durationMinutes}, ${exercisesSchema.durationMinutes}, 0)), 0)`
          .mapWith(Number),
    })
    .from(sessionsSchema)
    .leftJoin(
      sessionexercisesSchema,
      eq(sessionexercisesSchema.sessionId, sessionsSchema.id)
    )
    .leftJoin(
      exercisesSchema,
      eq(sessionexercisesSchema.exerciseId, exercisesSchema.id)
    )
    .where(filter)
    .groupBy(
      sessionsSchema.id,
      sessionsSchema.name,
      sessionsSchema.sessionDate,
      sessionsSchema.notes,
      sessionsSchema.createdAt
    );
}

export async function getSessionDB(id: number) {
  return await db
    .select()
    .from(sessionsSchema)
    .where(eq(sessionsSchema.id, id));
}

export async function filterSessionsDB(query: string | null) {
  return await buildSessionsQuery(query);
}

export const addSessionDB = async (session: SessionInput) => {
  return await db.insert(sessionsSchema).values(session).returning();
};

export const deleteSessionDB = async (id: number) => {
  return await db.delete(sessionsSchema).where(eq(sessionsSchema.id, id));
};
