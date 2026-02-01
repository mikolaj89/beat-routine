import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './screen-container.style';
import { PaperProvider, useTheme } from 'react-native-paper';

export const ScreenContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <PaperProvider>
      <SafeAreaView style={styles.safe}>
        <View
          style={[styles.screen, { backgroundColor: theme.colors.background }]}
        >
          {children}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
