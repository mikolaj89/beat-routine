import React from 'react';
import { render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { ExerciseOverwiew } from './exercise-overwiew';

describe('ExerciseOverwiew', () => {
  it('renders description and summary metrics', () => {
    const { getByText } = render(
      <PaperProvider>
        <ExerciseOverwiew
          description="RLRR LRLL"
          durationMinutes={5}
          bpm={120}
        />
      </PaperProvider>,
    );

    expect(getByText('RLRR LRLL')).toBeTruthy();
    expect(getByText('5 min')).toBeTruthy();
    expect(getByText('120 BPM')).toBeTruthy();
  });
});
