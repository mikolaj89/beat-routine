import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AddSessionExerciseRow } from './add-session-exercise-row';
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

describe('AddSessionExerciseRow', () => {
  it('renders exercise name and duration', () => {
    const { getByText } = render(
      <AddSessionExerciseRow
        exercise={exerciseFixture}
        selected={false}
        disabled={false}
        onToggle={() => {}}
      />,
    );
    expect(getByText('Paradiddle')).toBeTruthy();
    expect(getByText('5 min · 120 BPM')).toBeTruthy();
  });

  it('shows already in session when disabled', () => {
    const { getByText } = render(
      <AddSessionExerciseRow
        exercise={exerciseFixture}
        selected={false}
        disabled={true}
        onToggle={() => {}}
      />,
    );
    expect(getByText('Already in session')).toBeTruthy();
  });

  it('calls onToggle when row is pressed and not disabled', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <AddSessionExerciseRow
        exercise={exerciseFixture}
        selected={false}
        disabled={false}
        onToggle={onToggle}
      />,
    );
    fireEvent.press(getByText('Paradiddle'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call onToggle when disabled', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <AddSessionExerciseRow
        exercise={exerciseFixture}
        selected={false}
        disabled={true}
        onToggle={onToggle}
      />,
    );
    fireEvent.press(getByText('Paradiddle'));
    expect(onToggle).not.toHaveBeenCalled();
  });
});
