import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  sessionMeta: {
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  listTitle: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.text,
  },
  listContent: {
    marginTop: 2,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: 110,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
  },
});
