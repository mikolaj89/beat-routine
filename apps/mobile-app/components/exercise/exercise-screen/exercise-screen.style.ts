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
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  sessionName: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 6,
  },

  card: {
    marginHorizontal: theme.spacing.horizontalMargin,
    backgroundColor: theme.colors.surface,
    // borderRadius: theme.radius.lg,
    // borderWidth: 1,
    // borderColor: theme.colors.border,
  },
  cardContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardLabel: {

  },
  cardMetaLabel: {
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
  },
  kv: {
    flex: 1,
    gap: theme.spacing.xs,
  },

});
