import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { TopBar } from './top-bar';
import { AuthProvider, useAuth } from '../../providers/auth-provider';
import { useMobileRefresh } from '../../hooks/use-mobile-refresh';
import { useMobileLogin } from '../../hooks/use-mobile-login';
import { clearAuthTokensInStorage } from '../../utils/auth-storage';

jest.mock('../../hooks/use-mobile-refresh', () => ({
  useMobileRefresh: jest.fn(),
}));
jest.mock('../../hooks/use-mobile-login', () => ({
  useMobileLogin: jest.fn(),
}));
jest.mock('../../utils/auth-storage', () => ({
  clearAuthTokensInStorage: jest.fn(),
}));

const mockedUseMobileRefresh = useMobileRefresh as jest.MockedFunction<
  typeof useMobileRefresh
>;
const mockedUseMobileLogin = useMobileLogin as jest.MockedFunction<
  typeof useMobileLogin
>;
const mockedClearAuthTokens = clearAuthTokensInStorage as jest.MockedFunction<
  typeof clearAuthTokensInStorage
>;

function TopBarWithAuth() {
  const { logout } = useAuth();
  return <TopBar title="Sessions" onLogout={logout} />;
}

function renderTopBar(props: { onLogout?: () => void } = {}) {
  return render(
    <PaperProvider>
      <TopBar title="Sessions" onLogout={props.onLogout ?? jest.fn()} />
    </PaperProvider>,
  );
}

describe('TopBar drawer', () => {
  it('toggles drawer on when menu button is clicked', () => {
    const { getByTestId, getByText, queryByText } = renderTopBar();

    expect(queryByText('Logout')).toBeNull();
    fireEvent.press(getByTestId('topbar-menu-button'));

    expect(getByText('Logout')).toBeTruthy();
  });

  it('toggles drawer off when backdrop is clicked', async () => {
    const { getByTestId, getByText, queryByText } = renderTopBar();

    fireEvent.press(getByTestId('topbar-menu-button'));
    expect(getByText('Logout')).toBeTruthy();

    fireEvent.press(getByTestId('topbar-drawer-modal-backdrop'));
    await waitFor(() => {
      expect(queryByText('Logout')).toBeNull();
    });
  });

  it('calls onLogout when Logout drawer item is pressed', () => {
    const onLogout = jest.fn();
    const { getByTestId, getByText } = renderTopBar({ onLogout });

    fireEvent.press(getByTestId('topbar-menu-button'));
    fireEvent.press(getByText('Logout'));

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});

describe('[integration tests] TopBar drawer with auth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const refresh = jest.fn().mockResolvedValue({ accessToken: 'access-token' });
    mockedUseMobileRefresh.mockReturnValue({
      accessToken: undefined,
      refresh,
      isPending: false,
      error: null,
      isUnauthorized: false,
    });
    mockedUseMobileLogin.mockReturnValue({
      login: jest.fn(),
      isPending: false,
      error: null,
    });
  });

  it("invokes useMobileAuthSession's logout (clears tokens) when Logout drawer item is pressed", async () => {
    const { getByTestId, getByText } = render(
      <PaperProvider>
        <AuthProvider>
          <TopBarWithAuth />
        </AuthProvider>
      </PaperProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('topbar-menu-button')).toBeTruthy();
    });

    fireEvent.press(getByTestId('topbar-menu-button'));
    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(mockedClearAuthTokens).toHaveBeenCalled();
    });
  });
});
