import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import SessionScreen from './session-screen';
import {
  useRemoveExerciseFromSession,
  useReorderSessionExercises,
  useSessionQuery,
} from '@drum-scheduler/sdk';
import type { Exercise } from '@drum-scheduler/contracts';

const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    getParent: () => ({
      setOptions: mockSetOptions,
    }),
  }),
}));

jest.mock('@drum-scheduler/sdk', () => ({
  useSessionQuery: jest.fn(),
  useReorderSessionExercises: jest.fn(),
  useRemoveExerciseFromSession: jest.fn(),
}));

const mockUseSessionQuery = useSessionQuery as jest.MockedFunction<
  typeof useSessionQuery
>;
const mockUseReorderSessionExercises =
  useReorderSessionExercises as jest.MockedFunction<
    typeof useReorderSessionExercises
  >;
const mockUseRemoveExerciseFromSession =
  useRemoveExerciseFromSession as jest.MockedFunction<
    typeof useRemoveExerciseFromSession
  >;

const exerciseFixture: Exercise = {
  id: 1,
  name: 'Paradiddle',
  categoryId: null,
  description: 'RLRR LRLL',
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('SessionScreen', () => {
  beforeEach(() => {
    mockSetOptions.mockClear();
    mockUseReorderSessionExercises.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);
    mockUseRemoveExerciseFromSession.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);
  });

  it('renders session details and empty state', () => {
    mockUseSessionQuery.mockReturnValue({
      data: {
        name: 'Session 2026',
        totalDuration: 0,
        exercises: [],
      },
      isLoading: false,
      error: null,
    } as any);

    const onOpenAddExercises = jest.fn();
    const { getByText, getByTestId } = render(
      <PaperProvider>
        <SessionScreen
          baseUrl="http://example.test"
          sessionId={1}
          accessToken="token-123"
          onBack={() => {}}
          onStart={() => {}}
          onOpenAddExercises={onOpenAddExercises}
        />
      </PaperProvider>,
    );

    expect(getByText('Session plan')).toBeTruthy();
    fireEvent.press(getByTestId('topbar-delete-button'));
    fireEvent.press(getByText('Add exercises'));
    expect(onOpenAddExercises).toHaveBeenCalledWith(1);
    expect(mockUseSessionQuery).toHaveBeenCalledWith('http://example.test', 1, {
      accessToken: 'token-123',
    });
  });

  it('enters edit mode from top bar edit and shows save CTA', () => {
    mockUseSessionQuery.mockReturnValue({
      data: {
        name: 'Session 2026',
        totalDuration: 5,
        exercises: [exerciseFixture],
      },
      isLoading: false,
      error: null,
    } as any);

    const { getByTestId, getByText, queryByTestId } = render(
      <PaperProvider>
        <SessionScreen
          baseUrl="http://example.test"
          sessionId={1}
          accessToken="token-123"
          onBack={() => {}}
          onStart={() => {}}
        />
      </PaperProvider>,
    );

    fireEvent.press(getByTestId('topbar-edit-button'));

    expect(getByText('Save changes')).toBeTruthy();
    expect(queryByTestId('topbar-delete-button')).toBeNull();
  });

  it('renders exercise list when present', () => {
    mockUseSessionQuery.mockReturnValue({
      data: {
        name: 'Session 2026',
        totalDuration: 5,
        exercises: [exerciseFixture],
      },
      isLoading: false,
      error: null,
    } as any);

    const { getByText } = render(
      <PaperProvider>
        <SessionScreen
          baseUrl="http://example.test"
          sessionId={1}
          accessToken="token-123"
          onBack={() => {}}
          onStart={() => {}}
        />
      </PaperProvider>,
    );

    expect(getByText('Paradiddle')).toBeTruthy();
    expect(getByText('5 min')).toBeTruthy();
  });
});
