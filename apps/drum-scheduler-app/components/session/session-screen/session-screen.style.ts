import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';



export const styles = StyleSheet.create({
  screen: { flex: 1 },

  header: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  sessionTitle: {
    fontSize: theme.typography.cardTitle,
    fontWeight: '800',
    color: theme.colors.text,
  },
  sessionMeta: {
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },

  sectionTitle: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.textMuted,
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
    paddingTop: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
  },

  ctaWrap: {
    position: 'absolute',
    padding: theme.spacing.horizontalMargin,
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
  },

});
