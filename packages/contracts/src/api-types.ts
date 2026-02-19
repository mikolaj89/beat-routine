export type LoginResponseUser = {
  id: string;
  accountId: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
  user: LoginResponseUser;
  refreshToken?: string;
  refreshExpiresAt?: string;
};

export type RefreshResponse = {
  accessToken: string | null;
  refreshToken?: string;
  refreshExpiresAt?: string;
};
  