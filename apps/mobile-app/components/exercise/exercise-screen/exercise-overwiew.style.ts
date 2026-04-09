import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.horizontalMargin,
    ...theme.card.base,
  },
  cardContent: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  cardDivider: {
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
  cardMetaIcon: {
    color: theme.colors.primary,
  },
  metricValue: {
    fontWeight: '700',
    color: theme.colors.text,
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
