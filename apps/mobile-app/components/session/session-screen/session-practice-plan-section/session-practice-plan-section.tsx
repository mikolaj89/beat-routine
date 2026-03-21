import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { ExerciseCard } from '../exercise-card/exercise-card';
import { styles } from './session-practice-plan-section.style';

export function SessionPracticePlanSection({
  totalDurationMinutes,
  exercises,
  isLoading,
  hasError,
}: {
  totalDurationMinutes: number;
  exercises: Exercise[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const renderItem = ({ item }: ListRenderItemInfo<Exercise>) => (
    <ExerciseCard exercise={item} />
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.sessionMeta}>
          Total duration: {totalDurationMinutes} min
        </Text>
      </View>

      <Divider horizontalInset={true} />
      <Text style={styles.listTitle}>Practice session plan</Text>

      <FlatList
        data={exercises}
        keyExtractor={e => e.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading && !hasError ? (
            <Text style={styles.emptyText}>No exercises in this session.</Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
