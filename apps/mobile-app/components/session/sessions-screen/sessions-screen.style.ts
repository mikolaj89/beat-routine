import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: 120,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryText,
    position: 'absolute',
    right: theme.spacing.horizontalMargin,
    bottom: Platform.OS === 'ios'
      ? theme.platform.fabBottom.ios
      : theme.platform.fabBottom.android,
  },
  emptyText: {
    paddingTop: theme.spacing.md,
    color: theme.colors.textMuted,
  },
});
