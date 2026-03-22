import React, { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useAddExerciseToSession,
  useExercisesQuery,
  useSessionQuery,
} from '@drum-scheduler/sdk';
import { useAddSessionExercisesScreen } from './use-add-session-exercises-screen';

jest.mock('@drum-scheduler/sdk', () => ({
  useExercisesQuery: jest.fn(),
  useSessionQuery: jest.fn(),
  useAddExerciseToSession: jest.fn(),
}));

const mockUseExercisesQuery = useExercisesQuery as jest.MockedFunction<
  typeof useExercisesQuery
>;
const mockUseSessionQuery = useSessionQuery as jest.MockedFunction<
  typeof useSessionQuery
>;
const mockUseAddExerciseToSession = useAddExerciseToSession as jest.MockedFunction<
  typeof useAddExerciseToSession
>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useAddSessionExercisesScreen', () => {
  const onBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseExercisesQuery.mockReturnValue({
      data: [{ id: 1, name: 'A' }],
      isLoading: false,
      error: null,
    } as any);
    mockUseSessionQuery.mockReturnValue({
      data: { id: 10, name: 'S', totalDuration: 0, exercises: [] },
      isLoading: false,
      error: null,
    } as any);
    mockUseAddExerciseToSession.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      isPending: false,
      error: null,
      reset: jest.fn(),
    } as any);
  });

  it('exposes listStatus ready and exercises from query', () => {
    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.listStatus).toBe('ready');
    expect(result.current.exercises).toHaveLength(1);
    expect(result.current.emptyStatus).toBeNull();
  });

  it('sets listStatus to loading when exercises query is loading', () => {
    mockUseExercisesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.listStatus).toBe('loading');
  });

  it('sets listStatus to error when exercises query fails', () => {
    mockUseExercisesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('boom'),
    } as any);

    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.listStatus).toBe('error');
    expect(result.current.errorMessage).toBe('boom');
  });

  it('toggleSelection adds and removes ids', () => {
    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.selectedIds).toEqual([]);

    act(() => {
      result.current.toggleSelection(1);
    });
    expect(result.current.selectedIds).toEqual([1]);

    act(() => {
      result.current.toggleSelection(1);
    });
    expect(result.current.selectedIds).toEqual([]);
  });

  it('onAddToSession calls mutateAsync for each selected id then onBack', async () => {
    const mutateAsync = jest.fn().mockResolvedValue(undefined);
    mockUseAddExerciseToSession.mockReturnValue({
      mutateAsync,
      isPending: false,
      error: null,
      reset: jest.fn(),
    } as any);

    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.toggleSelection(2);
      result.current.toggleSelection(3);
    });

    await act(async () => {
      await result.current.onAddToSession();
    });

    expect(mutateAsync).toHaveBeenNthCalledWith(1, '2');
    expect(mutateAsync).toHaveBeenNthCalledWith(2, '3');
    expect(onBack).toHaveBeenCalled();
  });

  it('formats addSessionErrorMessage from mutation error', () => {
    mockUseAddExerciseToSession.mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue(new Error('fail')),
      isPending: false,
      error: new Error('fail'),
      reset: jest.fn(),
    } as any);

    const { result } = renderHook(
      () =>
        useAddSessionExercisesScreen({
          baseUrl: 'http://example.test',
          sessionId: 10,
          accessToken: 'token',
          onBack,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.addSessionErrorMessage).toBe('fail');
  });
});
