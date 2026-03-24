import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { ExerciseCard } from '../../exercise-card/exercise-card';
import { styles } from './session-exercises-list.style';

export function SessionExercisesList({
  exercises,
  isLoading,
  hasError,
  isDraggable = false,
}: {
  exercises: Exercise[];
  isLoading: boolean;
  hasError: boolean;
  isDraggable?: boolean;
}) {
  const [orderedExercises, setOrderedExercises] = useState(exercises);

  useEffect(() => {
    setOrderedExercises(exercises);
  }, [exercises]);

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
    />
  );
  const renderPlainItem = ({ item }: ListRenderItemInfo<Exercise>) => (
    <ExerciseCard exercise={item} />
  );

  return (
    <>
      <Text style={styles.listTitle}>Practice session plan</Text>
      {isDraggable ? (
        <DraggableFlatList
          data={orderedExercises}
          keyExtractor={e => e.id.toString()}
          renderItem={renderItem}
          onDragEnd={({ data }) => setOrderedExercises(data)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={orderedExercises}
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
