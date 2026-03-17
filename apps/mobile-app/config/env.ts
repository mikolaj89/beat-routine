import { z } from 'zod';

import {
  ACTIVE_ENV_SOURCE,
  DEFAULT_ENV_KEY,
  ENV_SOURCE,
  loadActiveEnvFile,
  loadMergedEnvFiles,
} from '../utils/env-file-utils';
import {
  formatZodError,
  parseOptionalWithSchema,
  parseWithSchema,
} from '../utils/env-zod-utils';

const envConfigSchema = z.object({
  API_BASE_URL: z.string().trim().url(),
});

const envSchema = z.object({
  envs: z.record(envConfigSchema),
});

const activeEnvSchema = z.object({
  active_env_name: z.string().trim().min(1),
});

type MobileAppEnv = z.infer<typeof envSchema>;
type ActiveMobileAppEnv = z.infer<typeof activeEnvSchema>;

function parseEnv(rawEnv: unknown): MobileAppEnv {
  return parseWithSchema(
    envSchema,
    rawEnv,
    error =>
      `Invalid mobile app environment configuration in ${ENV_SOURCE}: ${formatZodError(
        error,
      )}`,
  );
}

function parseActiveEnv(rawEnv: unknown): ActiveMobileAppEnv | null {
  return parseOptionalWithSchema(
    activeEnvSchema,
    rawEnv,
    error =>
      `Invalid active mobile app environment in ${ACTIVE_ENV_SOURCE}: ${formatZodError(
        error,
      )}`,
  );
}

const env = parseEnv(loadMergedEnvFiles());
const activeEnv = parseActiveEnv(loadActiveEnvFile());
const activeEnvKey = activeEnv?.active_env_name ?? DEFAULT_ENV_KEY;
const resolvedActiveEnv = env.envs[activeEnvKey];

if (!resolvedActiveEnv) {
  throw new Error(
    `Active environment "${activeEnvKey}" is not defined in ${ENV_SOURCE}`,
  );
}

export const activeEnvConfig = resolvedActiveEnv;
export const { API_BASE_URL } = activeEnvConfig;
