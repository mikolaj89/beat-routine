import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import AddSessionExercisesScreen from './add-session-exercises-screen';
import {
  useAddExerciseToSession,
  useExercisesQuery,
  useSessionQuery,
} from '@drum-scheduler/sdk';
import type { Exercise } from '@drum-scheduler/contracts';

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

const exerciseA: Exercise = {
  id: 1,
  name: 'Paradiddle',
  categoryId: null,
  description: null,
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const exerciseB: Exercise = {
  id: 2,
  name: 'Flam',
  categoryId: null,
  description: null,
  durationMinutes: 3,
  bpm: 100,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('AddSessionExercisesScreen', () => {
  beforeEach(() => {
    mockUseExercisesQuery.mockReturnValue({
      data: [exerciseA, exerciseB],
      isLoading: false,
      error: null,
    } as any);

    mockUseSessionQuery.mockReturnValue({
      data: {
        id: 10,
        name: 'Session',
        totalDuration: 0,
        exercises: [],
      },
      isLoading: false,
      error: null,
    } as any);

    mockUseAddExerciseToSession.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      isPending: false,
    } as any);
  });

  it('renders search and exercises', () => {
    const { getByPlaceholderText, getByText } = render(
      <PaperProvider>
        <AddSessionExercisesScreen
          baseUrl="http://example.test"
          sessionId={10}
          accessToken="token"
          onBack={() => {}}
        />
      </PaperProvider>,
    );

    expect(getByPlaceholderText('Search exercises…')).toBeTruthy();
    expect(getByText('Paradiddle')).toBeTruthy();
    expect(getByText('Flam')).toBeTruthy();
    expect(mockUseExercisesQuery).toHaveBeenCalled();
  });

  it('toggles selection and calls add mutation for selected ids', async () => {
    const mutateAsync = jest.fn().mockResolvedValue(undefined);
    mockUseAddExerciseToSession.mockReturnValue({
      mutateAsync,
      isPending: false,
    } as any);

    const onBack = jest.fn();

    const { getByText } = render(
      <PaperProvider>
        <AddSessionExercisesScreen
          baseUrl="http://example.test"
          sessionId={10}
          accessToken="token"
          onBack={onBack}
        />
      </PaperProvider>,
    );

    fireEvent.press(getByText('Paradiddle'));
    fireEvent.press(getByText('Add selected to session'));

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith('1');
    });
    expect(mutateAsync).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onBack).toHaveBeenCalled();
    });
  });
});
