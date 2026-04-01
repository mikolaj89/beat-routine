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
  ctaButton: {
    width: '100%',
  },
  ctaButtonContent: {
    minHeight: theme.sizes.ctaMinHeight,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonLabel: {
    marginVertical: 0,
    marginHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    lineHeight: 20,
    ...(Platform.OS === 'android'
      ? { textAlignVertical: 'center' as const, includeFontPadding: false }
      : {}),
  },
});
