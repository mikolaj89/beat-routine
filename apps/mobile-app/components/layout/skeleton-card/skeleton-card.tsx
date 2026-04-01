import React from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import { theme } from '../../../utils/theme';
import { styles } from './skeleton-card.style';

export function SkeletonCard({
  isAvatarVisible = false,
  lineWidths = ['70%', '45%'],
}: {
  isAvatarVisible?: boolean;
  lineWidths?: [string, string];
}) {
  return (
    <Surface style={styles.card} elevation={theme.elevation.card as 1}>
      <View style={styles.row}>
        {isAvatarVisible && <View style={styles.avatar} />}
        <View style={styles.textWrap}>
          <View style={[styles.line, { width: lineWidths[0] }]} />
          <View style={[styles.lineShort, { width: lineWidths[1] }]} />
        </View>
      </View>
    </Surface>
  );
}
