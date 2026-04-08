import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    ...theme.card.base,
    marginBottom: theme.spacing.sm,
  },
  draggingCard: {
    opacity: theme.opacity.dragging,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragHandle: {
    marginRight: theme.spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.body,
    fontWeight: '800',
    color: theme.colors.text,
  },
  meta: {
    fontSize: theme.typography.small,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});
