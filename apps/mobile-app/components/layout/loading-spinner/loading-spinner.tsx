import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { styles } from './loading-spinner.style';

export function LoadingSpinner({
  label,
  size = 'large',
  style,
}: {
  label?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} />
      {label ? (
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}
