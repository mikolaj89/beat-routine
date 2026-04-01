import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  pressable: {
    marginBottom: 0,
  },
  card: {
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  cardSelected: {
    backgroundColor: theme.colors.cardSelected,
  },
  cardDisabled: {
    opacity: theme.opacity.disabledCard,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs + 2,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
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
    marginTop: theme.spacing.xxs,
  },
  alreadyInSession: {
    fontSize: theme.typography.small,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});
