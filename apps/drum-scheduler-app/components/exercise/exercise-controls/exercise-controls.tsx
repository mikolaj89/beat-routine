import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStyles, theme } from './exercise-controls.style';
import { ExerciseState } from '../exercise-screen/exercise-screen.types';

export default function ExerciseControls({
  isPrevDisabled,
  isNextDisabled,


  mode,
  onPrev,
  onPlay,
  onPause,
  onFinish,
  onNext,
}: {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;

 
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
          <Pressable
            style={[
              styles.controlBtnSecondary,
              isPrevDisabled && styles.controlBtnDisabled,
            ]}
            onPress={onPrev}
            accessibilityLabel="Previous"
            disabled={isPrevDisabled}
          >
            <Icon
              name="chevron-left"
              size={22}
              color={theme.colors.secondaryText}
              style={styles.controlBtnSecondaryIconLeft}
            />
            <Text style={styles.controlBtnSecondaryText}>PREV</Text>
          </Pressable>
        )}

        {isPreviewMode || isPaused ? (
          <Pressable
            style={[
              styles.controlBtn,
              
            ]}
            onPress={onPlay}
            accessibilityLabel="Play"
        
          >
            <Icon
              name="play-arrow"
              size={26}
              color={theme.colors.primaryText}
            />
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.controlBtn
              
            ]}
            onPress={onPause}
            accessibilityLabel="Pause"
          >
            <Icon name="pause" size={26} color={theme.colors.primaryText} />
          </Pressable>
        )}
        {isPendingMode && (
          <Pressable
            style={styles.controlBtn}
            onPress={onFinish}
            accessibilityLabel="Finish"
          >
            <Icon name="close" size={26} color={theme.colors.primaryText} />
          </Pressable>
        )}
        {isPreviewMode && (
          <Pressable
            style={[
              styles.controlBtnSecondary,
              isNextDisabled && styles.controlBtnDisabled,
            ]}
            onPress={onNext}
            accessibilityLabel="Next"
            disabled={isNextDisabled}
          >
            <Text style={styles.controlBtnSecondaryText}>NEXT</Text>
            <Icon
              name="chevron-right"
              size={22}
              color={theme.colors.secondaryText}
              style={styles.controlBtnSecondaryIconRight}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
