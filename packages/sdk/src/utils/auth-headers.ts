export type RequestOptions = {
  accessToken?: string | null;
};

export function authHeaders(accessToken?: string | null): Record<string, string> {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}
