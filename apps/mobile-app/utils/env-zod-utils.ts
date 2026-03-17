import { z } from 'zod';

export function formatZodError(error: z.ZodError) {
  return error.issues
    .map(issue => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');
}

export function parseWithSchema<T>(
  schema: z.ZodType<T>,
  rawValue: unknown,
  buildErrorMessage: (error: z.ZodError) => string,
): T {
  try {
    return schema.parse(rawValue);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(buildErrorMessage(error));
    }

    throw error;
  }
}

export function parseOptionalWithSchema<T>(
  schema: z.ZodType<T>,
  rawValue: unknown | null,
  buildErrorMessage: (error: z.ZodError) => string,
): T | null {
  if (rawValue === null) {
    return null;
  }

  return parseWithSchema(schema, rawValue, buildErrorMessage);
}
