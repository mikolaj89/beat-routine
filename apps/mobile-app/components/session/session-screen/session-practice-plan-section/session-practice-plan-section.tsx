import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { SessionExercisesList } from './session-exercises-list/session-exercises-list';
import { styles } from './session-practice-plan-section.style';

export function SessionPracticePlanSection({
  totalDurationMinutes,
  exercises,
  isLoading,
  hasError,
  isEditMode = false,
  onReorderExercises,
  onRemoveExercise,
}: {
  totalDurationMinutes: number;
  exercises: Exercise[];
  isLoading: boolean;
  hasError: boolean;
  isEditMode?: boolean;
  onReorderExercises?: (exercises: Exercise[]) => void;
  onRemoveExercise?: (exerciseId: number) => void;
}) {
  const exercisesCount = exercises.length;

  return (
    <>
      <View style={styles.header}>
        
        <View style={styles.sessionStatsCard} testID="session-practice-plan-stats">
          <View style={styles.sessionStatItem}>
            <Text style={styles.sessionStatLabel}>Duration</Text>
            <View style={styles.sessionStatValueRow}>
              <Text style={styles.sessionStatValue}>{totalDurationMinutes}</Text>
              <Text style={styles.sessionStatUnit}> min</Text>
            </View>
          </View>
          <View style={styles.sessionStatDivider} />
          <View style={styles.sessionStatItem}>
            <Text style={styles.sessionStatLabel}>Exercises</Text>
            <View style={styles.sessionStatValueRow}>
              <Text style={styles.sessionStatValue}>{exercisesCount}</Text>
              <Text style={styles.sessionStatUnit}> total</Text>
            </View>
          </View>
        </View>
      </View>

      
      <SessionExercisesList
        exercises={exercises}
        isLoading={isLoading}
        hasError={hasError}
        isEditMode={isEditMode}
        onReorderExercises={onReorderExercises}
        onRemoveExercise={onRemoveExercise}
      />
    </>
  );
}
