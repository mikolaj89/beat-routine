import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { useCreateSession } from '@drum-scheduler/sdk';
import NewSessionScreen from './new-session-screen';

jest.mock('@drum-scheduler/sdk', () => ({
  useCreateSession: jest.fn(),
}));

const mockUseCreateSession = useCreateSession as jest.MockedFunction<
  typeof useCreateSession
>;

describe('NewSessionScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a session and navigates to details', async () => {
    const mutateCreateSession = jest
      .fn()
      .mockResolvedValue({ data: { id: 27 } } as any);
    const onOpenSession = jest.fn();

    mockUseCreateSession.mockReturnValue({
      mutateAsync: mutateCreateSession,
      isPending: false,
    } as any);

    const { getByTestId } = render(
      <PaperProvider>
        <NewSessionScreen
          baseUrl="http://example.test"
          accessToken="token-123"
          onBack={() => {}}
          onOpenSession={onOpenSession}
        />
      </PaperProvider>,
    );

    fireEvent.changeText(getByTestId('new-session-name-input'), 'My Session Name');
    fireEvent.press(getByTestId('create-session-submit'));

    await waitFor(() => {
      expect(mutateCreateSession).toHaveBeenCalledWith({
        name: 'My Session Name',
        notes: null,
      });
    });

    await waitFor(() => {
      expect(onOpenSession).toHaveBeenCalledWith(27);
    });
  });
});
