import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  screen: { flex: 1 },

  header: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  exerciseTitle: {
    color: theme.colors.text,
    marginBottom: theme.spacing.xs
  },
  titleRow: {
    flexDirection: 'row',
    color: theme.colors.textMuted,
    
    gap: theme.spacing.sm,
  },
  sessionName: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 0,
    color: theme.colors.textMuted,
  },
  exerciseIndex: {
    color: theme.colors.textMuted,
  },
  exerciseIndexSeparator: {
    color: theme.colors.textMuted,
  },
  card: {
    marginHorizontal: theme.spacing.horizontalMargin,
    ...theme.card.base,
  },
  cardContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardDivider: {
    backgroundColor: theme.colors.border,
  },
  cardMetaIcon: {
    color: theme.colors.textMuted,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  kv: {
    flex: 1,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

});
