import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import AccountScreen from './account-screen';
import { useAccountScreen } from './use-account-screen';

jest.mock('./use-account-screen', () => ({
  useAccountScreen: jest.fn(),
}));

const mockUseAccountScreen = useAccountScreen as jest.MockedFunction<
  typeof useAccountScreen
>;

describe('AccountScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current user email and logs out on button press', () => {
    const logout = jest.fn().mockResolvedValue(undefined);
    mockUseAccountScreen.mockReturnValue({
      currentUserEmail: 'drummer@example.com',
      currentUserRole: 'ADMIN',
      isCurrentUserLoading: false,
      logout,
    });

    const { getByText, getByTestId } = render(
      <PaperProvider>
        <AccountScreen />
      </PaperProvider>,
    );

    expect(getByText('drummer@example.com')).toBeTruthy();
    expect(getByText('ADMIN')).toBeTruthy();

    fireEvent.press(getByText('Log out'));

    expect(logout).toHaveBeenCalledTimes(1);
    expect(getByTestId('android-build-stamp')).toBeTruthy();
  });

  it('renders loading state while current user is being fetched', () => {
    mockUseAccountScreen.mockReturnValue({
      currentUserEmail: null,
      currentUserRole: null,
      isCurrentUserLoading: true,
      logout: jest.fn(),
    });

    const { getByText } = render(
      <PaperProvider>
        <AccountScreen />
      </PaperProvider>,
    );

    expect(getByText('Loading email...')).toBeTruthy();
    expect(getByText('Loading role...')).toBeTruthy();
  });
});
