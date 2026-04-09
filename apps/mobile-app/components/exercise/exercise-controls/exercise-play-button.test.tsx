import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { ExercisePlayButton } from './exercise-play-button';

describe('ExercisePlayButton', () => {
  it('renders and calls onPress', () => {
    const onPress = jest.fn();

    const { getByLabelText } = render(
      <PaperProvider>
        <ExercisePlayButton onPress={onPress} />
      </PaperProvider>,
    );

    fireEvent.press(getByLabelText('Play'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
