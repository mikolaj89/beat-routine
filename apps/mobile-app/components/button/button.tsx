import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, Button as PaperButton } from 'react-native-paper';
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
  loading = false,
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
      disabled={disabled || loading}
      mode={paperMode}
      icon={icon}
      loading={loading}
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
