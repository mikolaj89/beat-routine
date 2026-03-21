import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  ctaWrap: {
    position: 'absolute',
    padding: theme.spacing.horizontalMargin,
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
  },
  ctaButtonContent: {
    minHeight: 48,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonLabel: {
    marginVertical: 0,
    marginHorizontal: 24,
    paddingVertical: 14,
    lineHeight: 20,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
