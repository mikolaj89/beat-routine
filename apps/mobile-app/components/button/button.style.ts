import { Platform, StyleSheet } from 'react-native';
import { theme } from '@/utils/theme';

export const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    ...theme.components.button.Primary.filled.shadow,
  },
  primaryContent: {
    minHeight: theme.components.button.Primary.filled.minHeight,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    marginVertical: 0,
    marginHorizontal: theme.components.button.Primary.filled.labelMarginHorizontal,
    paddingVertical: theme.components.button.Primary.filled.labelPaddingVertical,
    lineHeight: theme.components.button.Primary.filled.labelLineHeight,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
