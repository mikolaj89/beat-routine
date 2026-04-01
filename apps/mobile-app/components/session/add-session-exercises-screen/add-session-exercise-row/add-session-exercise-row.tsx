import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { theme } from '../../../../utils/theme';
import { styles } from './add-session-exercise-row.style';

export function AddSessionExerciseRow({
  exercise,
  selected,
  disabled,
  onToggle,
}: {
  exercise: Exercise;
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  const duration = exercise.durationMinutes ?? 0;

  return (
    <Pressable
      onPress={disabled ? undefined : onToggle}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !disabled ? { opacity: theme.opacity.overlay } : null,
      ]}
    >
      <Card
        style={[
          styles.card,
          selected && styles.cardSelected,
          disabled && styles.cardDisabled,
        ]}
      >
        <Card.Content style={styles.content}>
          <View style={styles.row}>
            <Checkbox
              status={selected ? 'checked' : 'unchecked'}
              disabled={disabled}
              onPress={disabled ? undefined : onToggle}
            />
            <View style={styles.textBlock}>
              <Text style={styles.name} numberOfLines={2}>
                {exercise.name}
              </Text>
              <Text style={styles.meta}>
                {duration} min
                {exercise.bpm != null ? ` · ${exercise.bpm} BPM` : ''}
              </Text>
              {disabled ? (
                <Text style={styles.alreadyInSession}>Already in session</Text>
              ) : null}
            </View>
          </View>
        </Card.Content>
      </Card>
    </Pressable>
  );
}
