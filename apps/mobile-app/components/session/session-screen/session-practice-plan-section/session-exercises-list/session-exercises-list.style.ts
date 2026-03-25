import { StyleSheet } from 'react-native';
import { theme } from '../../../../../utils/theme';

export const styles = StyleSheet.create({
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
    paddingBottom: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
  },
});
