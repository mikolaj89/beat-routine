import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, IconButton } from 'react-native-paper';
import { getStyles } from './exercise-controls.style';
import { ExerciseState } from '../exercise-screen/exercise-screen.types';

export default function ExerciseControls({
  isPrevDisabled,

  mode,
  onPrev,
  onPlay,
  onPause,
  onFinish,
  onNext,
}: {
  isPrevDisabled: boolean;

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

  const styles = getStyles({ isPending: isPendingMode });

  return (
    <View style={styles.controlsWrap}>
      <View style={styles.controlsBar}>
        {isPreviewMode && (
          <Button
            mode="outlined"
            onPress={onPrev}
            accessibilityLabel="Previous"
            disabled={isPrevDisabled}
            style={[
              styles.controlBtnSecondary,
              isPrevDisabled && styles.controlBtnDisabled,
            ]}
            contentStyle={styles.controlBtnSecondaryContent}
            labelStyle={styles.controlBtnSecondaryLabel}
            icon={({ size, color }) => (
              <Icon
                name="chevron-left"
                size={size}
                color={color}
                style={styles.controlBtnSecondaryIconLeft}
              />
            )}
          >
            Prev
          </Button>
        )}

        {isPreviewMode || isPaused ? (
          <IconButton
            mode="contained"
            onPress={onPlay}
            accessibilityLabel="Play"
            
            size={26}
            icon={({ size, color }) => (
              <Icon name="play-arrow" size={size} color={color} />
            )}
          />
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
          <Button
            mode="outlined"
            onPress={onNext}
            accessibilityLabel="Next"
            style={[styles.controlBtnSecondary]}
            contentStyle={[
              styles.controlBtnSecondaryContent,
              styles.controlBtnSecondaryContentReverse,
            ]}
            labelStyle={styles.controlBtnSecondaryLabel}
            icon={({ size, color }) => (
              <Icon
                name="chevron-right"
                size={size}
                color={color}
                style={styles.controlBtnSecondaryIconRight}
              />
            )}
          >
            Next
          </Button>
        )}
      </View>
    </View>
  );
}
