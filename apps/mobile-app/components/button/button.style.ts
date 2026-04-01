import { Platform, StyleSheet } from 'react-native';
import { theme } from '@/utils/theme';

export const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    ...theme.shadows.buttonPrimary,
  },
  primaryContent: {
    minHeight: theme.sizes.ctaMinHeight,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    marginVertical: 0,
    marginHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    lineHeight: 20,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
