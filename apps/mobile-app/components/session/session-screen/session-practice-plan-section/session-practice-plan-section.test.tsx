import React from 'react';
import { render } from '@testing-library/react-native';
import type { Exercise } from '@drum-scheduler/contracts';
import { SessionPracticePlanSection } from './session-practice-plan-section';

jest.mock('./session-exercises-list/session-exercises-list', () => {
  const React = require('react');
  const { Text } = require('react-native-paper');

  return {
    SessionExercisesList: () => <Text>Session exercises list</Text>,
  };
});

const buildExercise = (id: number): Exercise => ({
  id,
  name: `Exercise ${id}`,
  categoryId: null,
  description: null,
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
});

describe('SessionPracticePlanSection', () => {
  it('renders duration and exercises stats in header card', () => {
    const exercises = [
      buildExercise(1),
      buildExercise(2),
      buildExercise(3),
      buildExercise(4),
    ];

    const { getByText, getByTestId } = render(
      <SessionPracticePlanSection
        totalDurationMinutes={18}
        exercises={exercises}
        isLoading={false}
        hasError={false}
      />,
    );

    expect(getByTestId('session-practice-plan-stats')).toBeTruthy();
    expect(getByText('Duration')).toBeTruthy();
    expect(getByText('18')).toBeTruthy();
    expect(getByText(' min')).toBeTruthy();
    expect(getByText('Exercises')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText(' total')).toBeTruthy();
  });
});
