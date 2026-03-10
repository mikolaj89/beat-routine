export function getApiBaseUrl() {
  const fromEnv = process.env.API_BASE_URL;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }

  const host = process.env.HOST ?? "127.0.0.1";
  const port = process.env.PORT ?? "8000";
  const protocol = process.env.API_BASE_URL_PROTOCOL ?? "http";

  return `${protocol}://${host}:${port}`;
}

