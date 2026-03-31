import { renderHook } from '@testing-library/react-native';
import { useFetchCurrentUser } from '@drum-scheduler/sdk';
import { useAccountScreen } from './use-account-screen';
import { useAuth } from '../../providers/auth-provider';

jest.mock('@drum-scheduler/sdk', () => ({
  useFetchCurrentUser: jest.fn(),
}));

jest.mock('../../providers/auth-provider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../config/env', () => ({
  API_BASE_URL: 'http://example.test',
}));

const mockUseFetchCurrentUser = useFetchCurrentUser as jest.MockedFunction<
  typeof useFetchCurrentUser
>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('useAccountScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current user with auth access token', () => {
    const logout = jest.fn();
    mockUseAuth.mockReturnValue({
      accessToken: 'token-123',
      logout,
    } as any);
    mockUseFetchCurrentUser.mockReturnValue({
      data: {
        email: 'drummer@example.com',
        role: 'ADMIN',
      },
      isLoading: false,
      isFetching: false,
    } as any);

    const { result } = renderHook(() => useAccountScreen());

    expect(mockUseFetchCurrentUser).toHaveBeenCalledWith('http://example.test', {
      accessToken: 'token-123',
    });
    expect(result.current.currentUserEmail).toBe('drummer@example.com');
    expect(result.current.currentUserRole).toBe('ADMIN');
    expect(result.current.isCurrentUserLoading).toBe(false);
    expect(result.current.logout).toBe(logout);
  });

  it('reports loading when current user query is still fetching', () => {
    mockUseAuth.mockReturnValue({
      accessToken: 'token-123',
      logout: jest.fn(),
    } as any);
    mockUseFetchCurrentUser.mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
    } as any);

    const { result } = renderHook(() => useAccountScreen());

    expect(result.current.currentUserEmail).toBeNull();
    expect(result.current.currentUserRole).toBeNull();
    expect(result.current.isCurrentUserLoading).toBe(true);
  });
});
