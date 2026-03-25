import { Alert } from 'react-native';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useDeleteSession } from '@drum-scheduler/sdk';
import { useSessionScreenDeleteAction } from './use-session-screen-delete-action';

jest.mock('@drum-scheduler/sdk', () => ({
  useDeleteSession: jest.fn(),
}));

const mockUseDeleteSession = useDeleteSession as jest.MockedFunction<
  typeof useDeleteSession
>;

describe('useSessionScreenDeleteAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens a confirmation alert when confirmDeleteSession is called', () => {
    mockUseDeleteSession.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      isPending: false,
    } as any);
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

    const { result } = renderHook(() =>
      useSessionScreenDeleteAction({
        baseUrl: 'http://example.test',
        sessionId: 7,
        accessToken: 'token-123',
        onDeleteSuccess: jest.fn(),
      }),
    );

    act(() => {
      result.current.confirmDeleteSession();
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Delete session?',
      'This action cannot be undone.',
      expect.any(Array),
      { cancelable: true },
    );
    expect(mockUseDeleteSession).toHaveBeenCalledWith('http://example.test', {
      accessToken: 'token-123',
    });

    alertSpy.mockRestore();
  });

  it('deletes session and calls onDeleteSuccess after confirm', async () => {
    const mutateAsync = jest.fn().mockResolvedValue(undefined);
    mockUseDeleteSession.mockReturnValue({
      mutateAsync,
      isPending: false,
    } as any);
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
    const onDeleteSuccess = jest.fn();

    const { result } = renderHook(() =>
      useSessionScreenDeleteAction({
        baseUrl: 'http://example.test',
        sessionId: 7,
        accessToken: 'token-123',
        onDeleteSuccess,
      }),
    );

    act(() => {
      result.current.confirmDeleteSession();
    });

    const alertButtons = (alertSpy.mock.calls[0]?.[2] ?? []) as Array<{
      text: string;
      onPress?: () => void;
    }>;
    const deleteButton = alertButtons.find(button => button.text === 'Delete');

    expect(deleteButton).toBeTruthy();

    act(() => {
      deleteButton?.onPress?.();
    });

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith(7);
    });
    await waitFor(() => {
      expect(onDeleteSuccess).toHaveBeenCalledTimes(1);
    });

    alertSpy.mockRestore();
  });

  it('sets deleteErrorMessage when delete fails', async () => {
    const mutateAsync = jest.fn().mockRejectedValue(new Error('request failed'));
    mockUseDeleteSession.mockReturnValue({
      mutateAsync,
      isPending: false,
    } as any);
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
    const onDeleteSuccess = jest.fn();

    const { result } = renderHook(() =>
      useSessionScreenDeleteAction({
        baseUrl: 'http://example.test',
        sessionId: 9,
        accessToken: 'token-123',
        onDeleteSuccess,
      }),
    );

    act(() => {
      result.current.confirmDeleteSession();
    });

    const alertButtons = (alertSpy.mock.calls[0]?.[2] ?? []) as Array<{
      text: string;
      onPress?: () => void;
    }>;
    const deleteButton = alertButtons.find(button => button.text === 'Delete');

    act(() => {
      deleteButton?.onPress?.();
    });

    await waitFor(() => {
      expect(result.current.deleteErrorMessage).toBe(
        'Failed to delete session. Please try again.',
      );
    });
    expect(onDeleteSuccess).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
