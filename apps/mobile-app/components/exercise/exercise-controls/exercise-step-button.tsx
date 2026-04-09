import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import { styles } from './exercise-step-button.style';

export function ExerciseStepButton({
  label,
  iconName,
  onPress,
  accessibilityLabel,
  isDisabled = false,
  isIconTrailing = false,
}: {
  label: string;
  iconName: string;
  onPress: () => void;
  accessibilityLabel: string;
  isDisabled?: boolean;
  isIconTrailing?: boolean;
}) {
  return (
    <Button
      mode="outlined"
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      contentStyle={[styles.content, isIconTrailing && styles.contentReversed]}
      labelStyle={styles.label}
      icon={({  color }) => (
        <Icon
          name={iconName}
          size={20}
          color={color}
          style={isIconTrailing ? styles.iconTrailing : styles.iconLeading}
        />
      )}
    >
      {label}
    </Button>
  );
}

