import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.lg,
  },
  card: {
    borderRadius: theme.radius.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
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
  body: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textMuted,
  },
  logoutButton: {
    alignSelf: 'flex-start',
  },
});
