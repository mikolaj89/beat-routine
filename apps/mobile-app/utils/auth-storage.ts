import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEYS = {
  refreshToken: "auth.refreshToken",
  legacyAccessToken: "auth.accessToken",
} as const;

export async function getRefreshTokenFromStorage(): Promise<string | null> {
  return AsyncStorage.getItem(AUTH_STORAGE_KEYS.refreshToken);
}

export async function setRefreshTokenInStorage(refreshToken: string): Promise<void> {
  await AsyncStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
}

export async function clearRefreshTokenInStorage(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
}

export async function clearAuthTokensInStorage(): Promise<void> {
  await AsyncStorage.multiRemove([
    AUTH_STORAGE_KEYS.refreshToken,
    AUTH_STORAGE_KEYS.legacyAccessToken,
  ]);
}
