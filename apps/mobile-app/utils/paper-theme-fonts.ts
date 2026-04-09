import { MD3LightTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

export const paperThemeFonts: MD3Theme['fonts'] = {
  ...MD3LightTheme.fonts,
  labelSmall: {
    ...MD3LightTheme.fonts.labelSmall,
    fontWeight: '700',
  },
  labelMedium: {
    ...MD3LightTheme.fonts.labelMedium,
    fontWeight: '700',
  },
  labelLarge: {
    ...MD3LightTheme.fonts.labelLarge,
    fontSize: 18,
    fontWeight: '700',
  },
  titleMedium: {
    ...MD3LightTheme.fonts.titleMedium,
    fontSize: 17,
    fontWeight: '700',
  },
  titleLarge: {
    ...MD3LightTheme.fonts.titleLarge,
    fontWeight: '700',
  },
};
