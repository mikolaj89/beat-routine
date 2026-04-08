import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  header: {
    elevation: theme.elevation.none,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  sessionStatsCard: {
    ...theme.card.base,
    marginBottom: theme.spacing.sm,
  },
  sessionStatsCardContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: 0,
  },
  sessionStatItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xxs,
  },
  sessionStatDivider: {
    width: 1,
    marginVertical: theme.spacing.xs,
    backgroundColor: theme.colors.border,
  },
  sessionStatLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  sessionStatValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sessionStatValue: {
    fontSize: theme.typography.cardTitle,
    color: theme.colors.text,
    fontWeight: '700',
    lineHeight: 24,
  },
  sessionStatUnit: {
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
    fontWeight: '600',
    paddingBottom: 1,
  },
});
