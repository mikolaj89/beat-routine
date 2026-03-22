import React from 'react';
import { render } from '@testing-library/react-native';
import { AddSessionExercisesList } from './add-session-exercises-list';
import type { Exercise } from '@drum-scheduler/contracts';

const exerciseFixture: Exercise = {
  id: 1,
  name: 'Paradiddle',
  categoryId: null,
  description: null,
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const defaultProps = {
  exercises: [] as Exercise[],
  errorMessage: '',
  alreadyInSessionIds: new Set<number>(),
  selectedIds: [] as number[],
  onToggleSelection: jest.fn(),
};

describe('AddSessionExercisesList', () => {
  it('shows loading indicator when listStatus is loading', () => {
    const { getByTestId } = render(
      <AddSessionExercisesList
        {...defaultProps}
        listStatus="loading"
        emptyStatus={null}
      />,
    );
    expect(getByTestId('add-session-exercises-list-loading')).toBeTruthy();
  });

  it('shows error message when listStatus is error', () => {
    const { getByText } = render(
      <AddSessionExercisesList
        {...defaultProps}
        listStatus="error"
        emptyStatus={null}
        errorMessage="Something went wrong"
      />,
    );
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('shows empty library copy when ready with no exercises', () => {
    const { getByText } = render(
      <AddSessionExercisesList
        {...defaultProps}
        listStatus="ready"
        emptyStatus="noLibrary"
      />,
    );
    expect(getByText('No exercises in the library yet.')).toBeTruthy();
  });

  it('shows no search match copy when emptyStatus is noMatch', () => {
    const { getByText } = render(
      <AddSessionExercisesList
        {...defaultProps}
        listStatus="ready"
        emptyStatus="noMatch"
      />,
    );
    expect(getByText('No exercises match your search.')).toBeTruthy();
  });

  it('renders exercise rows when list has data', () => {
    const { getByText } = render(
      <AddSessionExercisesList
        {...defaultProps}
        exercises={[exerciseFixture]}
        listStatus="ready"
        emptyStatus={null}
      />,
    );
    expect(getByText('Paradiddle')).toBeTruthy();
  });
});
