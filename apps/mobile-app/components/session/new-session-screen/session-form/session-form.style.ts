import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.cardTitle,
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  errorText: {
    color: '#e53935',
    fontSize: theme.typography.small,
  },
  submitWrap: {
    marginTop: theme.spacing.md,
  },
  submitButton: {
    width: '100%',
  },
});
