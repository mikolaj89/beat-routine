const EXAMPLE_ENV_PATH = '../env.example.json';
const LOCAL_ENV_PATH = '../env.json';
const ACTIVE_ENV_PATH = '../env.active.json';

export const ENV_SOURCE = 'apps/mobile-app/env.json or apps/mobile-app/env.example.json';
export const ACTIVE_ENV_SOURCE = 'apps/mobile-app/env.active.json';
export const DEFAULT_ENV_KEY = 'local';

type RequiredEnvPath = typeof EXAMPLE_ENV_PATH;
type OptionalEnvPath = typeof LOCAL_ENV_PATH | typeof ACTIVE_ENV_PATH;
type EnvPath = RequiredEnvPath | OptionalEnvPath;

function isModuleNotFound(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'MODULE_NOT_FOUND'
  );
}

function getSourceLabel(path: EnvPath) {
  return path.replace('../', 'apps/mobile-app/');
}

function requireJsonFile(path: RequiredEnvPath): unknown;
function requireJsonFile(path: OptionalEnvPath): unknown | null;
function requireJsonFile(path: EnvPath) {
  try {
    switch (path) {
      case EXAMPLE_ENV_PATH:
        return require(EXAMPLE_ENV_PATH) as unknown;
      case LOCAL_ENV_PATH:
        return require(LOCAL_ENV_PATH) as unknown;
      case ACTIVE_ENV_PATH:
        return require(ACTIVE_ENV_PATH) as unknown;
    }
  } catch (error: unknown) {
    if (path !== EXAMPLE_ENV_PATH && isModuleNotFound(error)) {
      return null;
    }

    throw new Error(
      `Failed to load ${getSourceLabel(path)}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function mergeEnvFiles(exampleEnv: unknown, localEnv: unknown) {
  const exampleEnvs =
    isRecord(exampleEnv) && isRecord(exampleEnv.envs) ? exampleEnv.envs : {};
  const localEnvs =
    isRecord(localEnv) && isRecord(localEnv.envs) ? localEnv.envs : {};

  return {
    envs: {
      ...exampleEnvs,
      ...localEnvs,
    },
  };
}

export function loadMergedEnvFiles() {
  return mergeEnvFiles(
    requireJsonFile(EXAMPLE_ENV_PATH),
    requireJsonFile(LOCAL_ENV_PATH),
  );
}

export function loadActiveEnvFile() {
  return requireJsonFile(ACTIVE_ENV_PATH);
}
