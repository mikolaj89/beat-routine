import { useFetchCurrentUser } from '@drum-scheduler/sdk';
import { API_BASE_URL } from '../../config/env';
import { useAuth } from '../../providers/auth-provider';

export function useAccountScreen() {
  const { accessToken, logout } = useAuth();
  const currentUserQuery = useFetchCurrentUser(API_BASE_URL, { accessToken });

  return {
    currentUserEmail: currentUserQuery.data?.email ?? null,
    currentUserRole: currentUserQuery.data?.role ?? null,
    isCurrentUserLoading: currentUserQuery.isLoading || currentUserQuery.isFetching,
    logout,
  };
}
