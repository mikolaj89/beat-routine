import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { getStyles } from './exercise-controls.style';
import { ExercisePlayButton } from './exercise-play-button';
import { ExerciseStepButton } from './exercise-step-button';
import { ExerciseState } from '../exercise-screen/exercise-screen.types';

export default function ExerciseControls({
  isPrevDisabled,
  isLastExercise,

  mode,
  onPrev,
  onPlay,
  onPause,
  onFinish,
  onNext,
}: {
  isPrevDisabled: boolean;
  isLastExercise: boolean;

  mode: ExerciseState;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onFinish: () => void;
  onNext: () => void;
}) {
  const isPreviewMode = mode === 'preview';
  const isPendingMode = !isPreviewMode;
  const isPaused = mode === 'paused';
  const nextStepLabel = isLastExercise ? 'Finish' : 'Next';

  const styles = getStyles({ isPending: isPendingMode });

  return (
    <View style={styles.controlsWrap}>
      <View style={styles.controlsBar}>
        {isPreviewMode && (
          <ExerciseStepButton
            label="Prev"
            iconName="skip-previous"
            onPress={onPrev}
            accessibilityLabel="Previous"
            isDisabled={isPrevDisabled}
          />
        )}

        {isPreviewMode || isPaused ? (
          <ExercisePlayButton onPress={onPlay} accessibilityLabel="Play" />
        ) : (
          <IconButton
            mode="contained"
            onPress={onPause}
            accessibilityLabel="Pause"
            size={26}
            icon={({ size, color }) => (
              <Icon name="pause" size={size} color={color} />
            )}
          />
        )}
        {isPendingMode && (
          <IconButton
            mode="contained"
            onPress={onFinish}
            accessibilityLabel="Finish"
            
            size={26}
            icon={({ size, color }) => (
              <Icon name="close" size={size} color={color} />
            )}
          />
        )}
        {isPreviewMode && (
          <ExerciseStepButton
            label={nextStepLabel}
            iconName={isLastExercise ? 'check' : 'skip-next'}
            onPress={onNext}
            accessibilityLabel={nextStepLabel}
            isIconTrailing={true}
          />
        )}
      </View>
    </View>
  );
}
