import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { getButtonConfig } from './button.helper';
import { styles } from './button.style';
import type { ButtonComponentProps } from './button.types';

export function Button({
  type,
  mode = 'filled',
  label,
  icon,
  style,
  contentStyle,
  labelStyle,
  disabled = false,
  testID,
  ...buttonProps
}: ButtonComponentProps) {
  const {
    mode: paperMode,
    buttonColor,
    textColor,
    buttonTheme,
  } = getButtonConfig({
    isDisabled: disabled,
    mode,
    type,
  });

  return (
    <PaperButton
      {...buttonProps}
      testID={testID}
      disabled={disabled}
      mode={paperMode}
      icon={icon}
      theme={buttonTheme}
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
