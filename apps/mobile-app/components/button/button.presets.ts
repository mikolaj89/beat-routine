import { theme } from '@/utils/theme';

export const buttonPresets = {
  Primary: {
    filled: {
      paperMode: 'contained',
      buttonColor: theme.colors.primary,
      disabledButtonColor: theme.colors.primaryDisabled,
      textColor: theme.colors.primaryText,
      disabledTextColor: theme.colors.primaryTextDisabled,
      minHeight: theme.sizes.ctaMinHeight,
      labelMarginHorizontal: theme.spacing.xl,
      labelPaddingVertical: theme.spacing.md,
      labelLineHeight: 20,
      shadow: {
        shadowColor: '#636AE8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
      },
    },
  },
} as const;
