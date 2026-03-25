import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import { styles } from './session-exercises-list-placeholder.style';

export function SessionExercisesListPlaceholder({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <View style={styles.skeletonWrap}>
      {Array.from({ length: count }).map((_, index) => (
        <Surface
          key={`session-exercises-list-skeleton-${index}`}
          style={styles.skeletonCard}
          elevation={1}
        >
          <View style={styles.skeletonRow}>
            <View style={styles.skeletonLine} />
            <View style={styles.skeletonLineShort} />
          </View>
        </Surface>
      ))}
    </View>
  );
}
