import { z } from 'zod';

const MIN_NAME_LENGTH = 5;

export const newSessionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(MIN_NAME_LENGTH, `Minimum name length is ${MIN_NAME_LENGTH}`),
});

export type NewSessionFormData = z.infer<typeof newSessionSchema>;
