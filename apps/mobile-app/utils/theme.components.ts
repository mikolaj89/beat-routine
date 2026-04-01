import { themeTokens } from './theme.tokens';

export const themeComponents = {
  button: {
    Primary: {
      filled: {
        paperMode: 'contained',
        buttonColor: themeTokens.colors.primary,
        disabledButtonColor: themeTokens.colors.primaryDisabled,
        textColor: themeTokens.colors.primaryText,
        disabledTextColor: themeTokens.colors.primaryTextDisabled,
        minHeight: themeTokens.sizes.ctaMinHeight,
        labelMarginHorizontal: themeTokens.spacing.xl,
        labelPaddingVertical: themeTokens.spacing.md,
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
  },
} as const;
