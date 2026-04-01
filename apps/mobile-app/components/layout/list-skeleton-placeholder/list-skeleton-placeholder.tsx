import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SkeletonCard } from '../skeleton-card';
import { styles } from './list-skeleton-placeholder.style';

export function ListSkeletonPlaceholder({
  count = 3,
  isAvatarVisible = false,
  lineWidths,
  style,
}: {
  count?: number;
  isAvatarVisible?: boolean;
  lineWidths?: [string, string];
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.wrap, style]}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard
          key={`skeleton-${index}`}
          isAvatarVisible={isAvatarVisible}
          lineWidths={lineWidths}
        />
      ))}
    </View>
  );
}
