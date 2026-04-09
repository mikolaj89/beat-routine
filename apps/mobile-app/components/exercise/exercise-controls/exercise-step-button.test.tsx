import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ExerciseStepButton } from './exercise-step-button';

describe('ExerciseStepButton', () => {
  it('renders and triggers onPress', () => {
    const onPress = jest.fn();

    const { getByLabelText, getByText } = render(
      <ExerciseStepButton
        label="Prev"
        iconName="chevron-left"
        onPress={onPress}
        accessibilityLabel="Previous"
      />,
    );

    expect(getByText('Prev')).toBeTruthy();

    fireEvent.press(getByLabelText('Previous'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onPress when disabled', () => {
    const onPress = jest.fn();

    const { getByLabelText } = render(
      <ExerciseStepButton
        label="Next"
        iconName="chevron-right"
        onPress={onPress}
        accessibilityLabel="Next"
        isDisabled={true}
        isIconTrailing={true}
      />,
    );

    fireEvent.press(getByLabelText('Next'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
