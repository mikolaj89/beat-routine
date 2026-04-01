import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '@/utils/theme';
import { styles } from './button.style';
import type { ButtonComponentProps } from './button.types';

const BUTTON_MODE_BY_TYPE = {
  Primary: 'contained',
} as const;

export function Button({
  type,
  label,
  icon,
  style,
  contentStyle,
  labelStyle,
  disabled = false,
  ...buttonProps
}: ButtonComponentProps) {
  const buttonColor =
    type === 'Primary'
      ? disabled
        ? theme.colors.primaryDisabled
        : theme.colors.primary
      : theme.colors.primary;
  const textColor = disabled
    ? theme.colors.primaryTextDisabled
    : theme.colors.primaryText;

  return (
    <PaperButton
      {...buttonProps}
      disabled={disabled}
      mode={BUTTON_MODE_BY_TYPE[type]}
      icon={icon}
      buttonColor={buttonColor}
      textColor={textColor}
      style={[styles.primaryButton, style]}
      contentStyle={[styles.primaryContent, contentStyle]}
      labelStyle={[styles.primaryLabel, labelStyle]}
    >
      {label}
    </PaperButton>
  );
}
