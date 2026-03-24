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
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.sessionMeta}>
          Total duration: {totalDurationMinutes} min
        </Text>
      </View>

      <Divider horizontalInset={true} />
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
