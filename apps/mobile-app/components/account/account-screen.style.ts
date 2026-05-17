import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.lg,
  },
  card: {
    ...theme.card.base,
    padding: theme.spacing.lg,
  },
  avatar: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.pillBg,
  },
  title: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  email: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  role: {
    marginBottom: theme.spacing.md,
    color: theme.colors.textMuted,
  },
  body: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textMuted,
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
  buildStamp: {
    marginTop: theme.spacing.lg,
    color: theme.colors.textMuted,
  },
});
