export const TOKEN_STORAGE_KEY = "auth.accessToken";

export const getSessionStorageAccessToken = () => {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export const removeSessionStorageAccessToken = () => {
  try {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // no-op
  }
}

export const setSessionStorageAccessToken = (token: string) => {
  try {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // no-op
  }
}