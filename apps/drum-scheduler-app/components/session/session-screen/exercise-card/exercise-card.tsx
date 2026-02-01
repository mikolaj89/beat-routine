import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { styles } from './exercise-card.style';

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const duration = exercise.durationMinutes ?? 0;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.meta}>{duration} min</Text>
      </Card.Content>
    </Card>
  );
}
