import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { styles } from './exercise-card.style';

export function ExerciseCard({
  exercise,
  onDragHandlePressIn,
  isDragging = false,
}: {
  exercise: Exercise;
  onDragHandlePressIn?: () => void;
  isDragging?: boolean;
}) {
  const duration = exercise.durationMinutes ?? 0;

  return (
    <Card style={[styles.card, isDragging && styles.draggingCard]}>
      <Card.Content style={styles.content}>
        <View style={styles.row}>
          {onDragHandlePressIn && (
            <Pressable
              onPressIn={onDragHandlePressIn}
              testID="exercise-card-drag-handle"
              hitSlop={8}
              style={styles.dragHandle}
            >
              <Icon source="drag" size={22} />
            </Pressable>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.name}>{exercise.name}</Text>
            <Text style={styles.meta}>{duration} min</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
