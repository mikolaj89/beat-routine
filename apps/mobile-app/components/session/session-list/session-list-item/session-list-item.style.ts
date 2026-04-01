import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.lg + 2,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    overflow: 'hidden',
  },
  cardContent: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md - 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md - 2,
  },
  cardAvatar: {
    backgroundColor: theme.colors.avatarBg,
  },
  cardTextWrap: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontWeight: '700',
    color: theme.colors.text,
  },
  cardMeta: {
    color: theme.colors.cardMeta,
  },
  cardChevron: {
    margin: 0,
  },
});
