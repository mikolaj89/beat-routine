import { Platform, StyleSheet } from 'react-native';
import { theme } from '@/utils/theme';

const typography = {
  buttonLabel: {
    fontWeight: '500',
    fontSize: 18,
  } as const,
};

export const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  content: {
    minHeight: theme.sizes.ctaMinHeight,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.buttonLabel,
    marginVertical: 0,
    marginHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    lineHeight: 20,

    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
