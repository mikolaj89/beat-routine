import React, { useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { ExerciseCard } from '../../exercise-card/exercise-card';
import { SessionExercisesListPlaceholder } from './session-exercises-list-placeholder/session-exercises-list-placeholder';
import { styles } from './session-exercises-list.style';

export function SessionExercisesList({
  exercises,
  isLoading,
  hasError,
  isEditMode = false,
  onReorderExercises,
  onRemoveExercise,
}: {
  exercises: Exercise[];
  isLoading: boolean;
  hasError: boolean;
  isEditMode?: boolean;
  onReorderExercises?: (exercises: Exercise[]) => void;
  onRemoveExercise?: (exerciseId: number) => void;
}) {
  const emptyComponent = useMemo(
    () =>
      !isLoading && !hasError ? (
        <Text style={styles.emptyText}>No exercises in this session.</Text>
      ) : null,
    [hasError, isLoading],
  );

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Exercise>) => (
    <ExerciseCard
      exercise={item}
      onDragHandlePressIn={drag}
      isDragging={isActive}
      onDeletePress={() => onRemoveExercise?.(item.id)}
    />
  );
  const renderPlainItem = ({ item }: ListRenderItemInfo<Exercise>) => (
    <ExerciseCard exercise={item} />
  );

  return (
    <>
      <Text style={styles.listTitle} variant="titleMedium">Exercises</Text>
      {isLoading ? (
        <SessionExercisesListPlaceholder count={4} />
      ) : isEditMode ? (
        <DraggableFlatList
          data={exercises}
          keyExtractor={e => e.id.toString()}
          renderItem={renderItem}
          onDragEnd={({ data }) => onReorderExercises?.(data)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={e => e.id.toString()}
          renderItem={renderPlainItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
          
          
        />
      )}
    </>
  );
}
