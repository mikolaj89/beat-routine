import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SessionScreenActions } from './session-screen-actions';

describe('SessionScreenActions', () => {
  it('shows Start Session and calls onPressStartSession when hasExercises', () => {
    const onPressStartSession = jest.fn();
    const onPressAddExercises = jest.fn();

    const { getByText, queryByText } = render(
      <SessionScreenActions
        hasExercises={true}
        onPressStartSession={onPressStartSession}
        onPressAddExercises={onPressAddExercises}
      />,
    );

    expect(getByText('Start Session')).toBeTruthy();
    expect(queryByText('Add exercises')).toBeNull();

    fireEvent.press(getByText('Start Session'));
    expect(onPressStartSession).toHaveBeenCalledTimes(1);
    expect(onPressAddExercises).not.toHaveBeenCalled();
  });

  it('shows hint and Add exercises and calls onPressAddExercises when no exercises', () => {
    const onPressStartSession = jest.fn();
    const onPressAddExercises = jest.fn();

    const { getByText, queryByText } = render(
      <SessionScreenActions
        hasExercises={false}
        onPressStartSession={onPressStartSession}
        onPressAddExercises={onPressAddExercises}
      />,
    );

    expect(
      getByText('No exercises in this session. Start by adding some! 🚀 '),
    ).toBeTruthy();
    expect(getByText('Add exercises')).toBeTruthy();
    expect(queryByText('Start Session')).toBeNull();

    fireEvent.press(getByText('Add exercises'));
    expect(onPressAddExercises).toHaveBeenCalledTimes(1);
    expect(onPressStartSession).not.toHaveBeenCalled();
  });
});
