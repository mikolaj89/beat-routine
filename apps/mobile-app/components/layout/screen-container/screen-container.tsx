import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { styles } from './screen-container.style';

export const ScreenContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.safe}>
      <View
        style={[styles.screen, { backgroundColor: theme.colors.background }]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
