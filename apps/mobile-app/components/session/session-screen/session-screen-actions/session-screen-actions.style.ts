import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  noExercisesWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: theme.spacing.horizontalMargin,
  },
  noExercisesContent: {
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing.md,
    textAlign: 'center',
  },
  noExercisesText: {
    textAlign: 'center',
  },
  ctaWrap: {
    marginTop: 'auto',
    paddingTop: 8,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
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
