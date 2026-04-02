import type { ViewStyle } from 'react-native';
import { theme } from '@/utils/theme';

export type ButtonPreset = {
  buttonColor?: string;
  disabledButtonColor?: string;
  disabledOutlineColor?: string;
  disabledTextColor: string;
  outlineColor?: string;
  paperMode: 'contained' | 'outlined' | 'contained-tonal' | 'text';
  shadow?: ViewStyle;
  textColor: string;
};

export const buttonPresets = {
  Primary: {
    filled: {
      paperMode: 'contained',
      buttonColor: theme.colors.primary,
      disabledButtonColor: theme.colors.primaryDisabled,
      textColor: theme.colors.primaryText,
      disabledTextColor: theme.colors.primaryTextDisabled,
      shadow: {
        shadowColor: '#636AE8',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
      },
    },
    outlined: {
      paperMode: 'outlined',
      textColor: theme.colors.primary,
      disabledTextColor: theme.colors.primaryDisabled,
      outlineColor: theme.colors.primary,
      disabledOutlineColor: theme.colors.primaryDisabled,
    },
    tonal: {
      paperMode: 'contained-tonal',
      buttonColor: theme.colors.pillBg,
      disabledButtonColor: theme.colors.cardSelected,
      textColor: theme.colors.text,
      disabledTextColor: theme.colors.textMuted,
    },
  },
} satisfies Record<string, Record<string, ButtonPreset>>;
