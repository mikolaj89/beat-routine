import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import { styles } from './session-loading-placeholder.style';

export function SessionLoadingPlaceholder({
  isLoading,
  count = 3,
}: {
  isLoading: boolean;
  count?: number;
}) {
  if (!isLoading) return null;

  return (
    <View style={styles.skeletonWrap}>
      {Array.from({ length: count }).map((_, index) => (
        <Surface
          key={`session-skeleton-${index}`}
          style={styles.skeletonCard}
          elevation={1}
        >
          <View style={styles.skeletonRow}>
            <View style={styles.skeletonAvatar} />
            <View style={styles.skeletonTextWrap}>
              <View style={styles.skeletonLine} />
              <View style={styles.skeletonLineShort} />
            </View>
          </View>
        </Surface>
      ))}
    </View>
  );
}
