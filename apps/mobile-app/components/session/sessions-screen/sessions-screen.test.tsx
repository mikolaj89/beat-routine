import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import SessionsScreen from './sessions-screen';
import { useSessionsQuery } from '@drum-scheduler/sdk';
import { API_BASE_URL } from '../../../config/env';
import { useAuth } from '../../../providers/auth-provider';

jest.mock('@drum-scheduler/sdk', () => ({
  useSessionsQuery: jest.fn(),
}));
jest.mock('../../../providers/auth-provider', () => ({
  useAuth: jest.fn(),
}));

const mockUseSessionsQuery = useSessionsQuery as jest.MockedFunction<
  typeof useSessionsQuery
>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('SessionsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      logout: jest.fn(),
    } as any);
  });

  it('renders the empty state and queries sessions with the current filters', () => {
    mockUseSessionsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    const { getByText } = render(
      <PaperProvider>
        <SessionsScreen accessToken="token-123" onOpenSession={() => {}} />
      </PaperProvider>,
    );

    expect(getByText('My Sessions')).toBeTruthy();
    expect(getByText('No sessions found.')).toBeTruthy();
    expect(mockUseSessionsQuery).toHaveBeenCalledWith(API_BASE_URL, {
      accessToken: 'token-123',
      query: '',
      debounceMs: 500,
    });
  });

  it('calls onOpenCreateSession when pressing the FAB', () => {
    mockUseSessionsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    const onOpenCreateSession = jest.fn();

    const { getByTestId } = render(
      <PaperProvider>
        <SessionsScreen
          accessToken="token-123"
          onOpenSession={() => {}}
          onOpenCreateSession={onOpenCreateSession}
        />
      </PaperProvider>,
    );

    fireEvent.press(getByTestId('sessions-new-session-fab'));

    expect(onOpenCreateSession).toHaveBeenCalledTimes(1);
  });
});
