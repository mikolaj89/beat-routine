import React, { type PropsWithChildren } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMobileRefresh } from './use-mobile-refresh';
import { mobileRefresh } from '../api/mobile-auth';
import { getRefreshTokenFromStorage, setRefreshTokenInStorage } from '../utils/auth-storage';

jest.mock('../api/mobile-auth', () => ({
  mobileRefresh: jest.fn(),
}));

jest.mock('../utils/auth-storage', () => ({
  getRefreshToken: jest.fn(),
  setRefreshToken: jest.fn(),
}));

const mockedMobileRefresh = mobileRefresh as jest.MockedFunction<
  typeof mobileRefresh
>;
const mockedGetRefreshToken = getRefreshTokenFromStorage as jest.MockedFunction<
  typeof getRefreshTokenFromStorage
>;
const mockedSetRefreshToken = setRefreshTokenInStorage as jest.MockedFunction<
  typeof setRefreshTokenInStorage
>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useMobileRefresh', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses stored refresh token and rotates it', async () => {
    mockedGetRefreshToken.mockResolvedValue('refresh-token');
    mockedMobileRefresh.mockResolvedValue({
      accessToken: 'access-token',
      refreshToken: 'new-refresh-token',
    });

    const { result } = renderHook(
      () => useMobileRefresh('http://localhost:8000'),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      const response = await result.current.refresh();
      expect(response.accessToken).toBe('access-token');
    });

    expect(mockedMobileRefresh).toHaveBeenCalledWith(
      'refresh-token',
      'http://localhost:8000',
    );

    await waitFor(() => {
      expect(result.current.accessToken).toBe('access-token');
      expect(result.current.error).toBeNull();
      expect(result.current.isUnauthorized).toBe(false);
      expect(result.current.isPending).toBe(false);
    });
  });

  it('throws unauthorized when refresh token is missing', async () => {
    mockedGetRefreshToken.mockResolvedValue(null);

    const { result } = renderHook(
      () => useMobileRefresh('http://localhost:8000'),
      {
        wrapper: createWrapper(),
      },
    );

    await act(async () => {
      await expect(result.current.refresh()).rejects.toThrow('UNAUTHORIZED');
    });

    await waitFor(() => {
        expect(result.current.accessToken).toBeUndefined();
        expect(result.current.error).toBe('UNAUTHORIZED');
        expect(result.current.isUnauthorized).toBe(true);
        expect(result.current.isPending).toBe(false);
    });
  });
});
