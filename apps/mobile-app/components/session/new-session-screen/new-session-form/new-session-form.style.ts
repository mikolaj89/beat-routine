import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.small,
  },
  submitWrap: {
    marginTop: theme.spacing.md,
  },
  submitButton: {
    width: '100%',
  },
});
