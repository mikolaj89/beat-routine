import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { theme } from '../../../utils/theme';
import { styles } from './exercise-play-button.style';

export function ExercisePlayButton({
  onPress,
  accessibilityLabel = 'Play',
}: {
  onPress: () => void;
  accessibilityLabel?: string;
}) {
  return (
    <IconButton
      mode="contained"
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      containerColor={theme.colors.primary}
      iconColor={theme.colors.primaryText}
      size={40}
      style={styles.button}
      contentStyle={styles.content}
      icon={({ color }) => (
        <Icon
          name="play-arrow"
          size={30}
          color={color}
          style={styles.icon}
        />
      )}
    />
  );
}
