import { Platform, StyleSheet } from 'react-native';
import { buttonPresets } from './button.presets';

const primaryFilledButtonPreset = buttonPresets.Primary.filled;

export const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    ...primaryFilledButtonPreset.shadow,
  },
  primaryContent: {
    minHeight: primaryFilledButtonPreset.minHeight,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryLabel: {
    marginVertical: 0,
    marginHorizontal: primaryFilledButtonPreset.labelMarginHorizontal,
    paddingVertical: primaryFilledButtonPreset.labelPaddingVertical,
    lineHeight: primaryFilledButtonPreset.labelLineHeight,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingLabel: {
    color: primaryFilledButtonPreset.textColor,
    marginVertical: 0,
    marginHorizontal: primaryFilledButtonPreset.labelMarginHorizontal,
    paddingVertical: primaryFilledButtonPreset.labelPaddingVertical,
    lineHeight: primaryFilledButtonPreset.labelLineHeight,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
