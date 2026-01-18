import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ExerciseControls from './exercise-controls';

describe('ExerciseControls', () => {
  it('renders buttons and triggers handlers', () => {
    const onPrev = jest.fn();
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const onFinish = jest.fn();
    const onNext = jest.fn();

    const { getByLabelText } = render(
      <ExerciseControls
        isPrevNextDisabled={false}
        isPlayDisabled={false}
        isPauseDisabled={false}
        onPrev={onPrev}
        onPlay={onPlay}
        onPause={onPause}
        onFinish={onFinish}
        onNext={onNext}
      />
    );

    fireEvent.press(getByLabelText('Previous'));
    fireEvent.press(getByLabelText('Play'));
    fireEvent.press(getByLabelText('Pause'));
    fireEvent.press(getByLabelText('Finish'));
    fireEvent.press(getByLabelText('Next'));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
