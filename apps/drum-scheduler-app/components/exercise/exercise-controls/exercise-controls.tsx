import React from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles, theme } from './exercise-controls.style';

export default function ExerciseControls({
  isPrevNextDisabled,
  isPlayDisabled,
  isPauseDisabled,
  onPrev,
  onPlay,
  onPause,
  onFinish,
  onNext,
}: {
  isPrevNextDisabled: boolean;
  isPlayDisabled: boolean;
  isPauseDisabled: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onFinish: () => void;
  onNext: () => void;
}) {
  return (
    <View style={styles.controlsWrap}>
      <View style={styles.controlsBar}>
        <Pressable
          style={[
            styles.controlBtn,
            isPrevNextDisabled && styles.controlBtnDisabled,
          ]}
          onPress={onPrev}
          accessibilityLabel="Previous"
          disabled={isPrevNextDisabled}
        >
          <Icon name="skip-previous" size={26} color={theme.colors.primaryText} />
        </Pressable>

        <Pressable
          style={[styles.controlBtn, isPlayDisabled && styles.controlBtnDisabled]}
          onPress={onPlay}
          accessibilityLabel="Play"
          disabled={isPlayDisabled}
        >
          <Icon name="play-arrow" size={26} color={theme.colors.primaryText} />
        </Pressable>

        <Pressable
          style={[
            styles.controlBtn,
            isPauseDisabled && styles.controlBtnDisabled,
          ]}
          onPress={onPause}
          accessibilityLabel="Pause"
          disabled={isPauseDisabled}
        >
          <Icon name="pause" size={26} color={theme.colors.primaryText} />
        </Pressable>

        <Pressable
          style={styles.controlBtn}
          onPress={onFinish}
          accessibilityLabel="Finish"
        >
          <Icon name="stop" size={26} color={theme.colors.primaryText} />
        </Pressable>

        <Pressable
          style={[
            styles.controlBtn,
            isPrevNextDisabled && styles.controlBtnDisabled,
          ]}
          onPress={onNext}
          accessibilityLabel="Next"
          disabled={isPrevNextDisabled}
        >
          <Icon name="skip-next" size={26} color={theme.colors.primaryText} />
        </Pressable>
      </View>
    </View>
  );
}
