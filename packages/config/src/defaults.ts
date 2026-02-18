export const APP_DEFAULTS = {
  locale: "en",
  timezone: "UTC",
  pagination: {
    page: 1,
    pageSize: 20,
  },
} as const;

/** Default API base URL (mobile Android emulator: 10.0.2.2; use env or app config to override per app). */
export const API_BASE_URL = "http://10.0.2.2:8000";
