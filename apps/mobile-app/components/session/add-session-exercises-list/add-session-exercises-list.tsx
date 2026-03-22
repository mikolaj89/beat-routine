import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { AddSessionExerciseRow } from '../add-session-exercises-screen/add-session-exercise-row';
import type { AddSessionExercisesListStatus } from '../add-session-exercises-screen/use-add-session-exercises-screen';
import { styles } from './add-session-exercises-list.style';

export function AddSessionExercisesList({
  exercises,
  listStatus,
  emptyStatus,
  errorMessage,
  alreadyInSessionIds,
  selectedIds,
  onToggleSelection,
}: {
  exercises: Exercise[];
  listStatus: AddSessionExercisesListStatus;
  emptyStatus: 'noLibrary' | 'noMatch' | null;
  errorMessage: string;
  alreadyInSessionIds: Set<number>;
  selectedIds: number[];
  onToggleSelection: (exerciseId: number) => void;
}) {
  const renderItem = ({ item }: ListRenderItemInfo<Exercise>) => {
    const alreadyIn = alreadyInSessionIds.has(item.id);
    const selected = selectedIds.includes(item.id);

    return (
      <AddSessionExerciseRow
        exercise={item}
        selected={selected}
        disabled={alreadyIn}
        onToggle={() => onToggleSelection(item.id)}
      />
    );
  };

  if (listStatus === 'loading') {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator testID="add-session-exercises-list-loading" />
      </View>
    );
  }

  if (listStatus === 'error') {
    return (
      <View style={styles.listFlex}>
        <Text style={styles.centerMessage}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.listFlex}>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          emptyStatus ? (
            <Text style={styles.centerMessage}>
              {emptyStatus === 'noLibrary'
                ? 'No exercises in the library yet.'
                : 'No exercises match your search.'}
            </Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
