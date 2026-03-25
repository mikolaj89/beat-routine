import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: 120,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.horizontalMargin,
    bottom: Platform.OS === 'ios' ? 34 : 20,
  },
  emptyText: {
    paddingTop: theme.spacing.md,
    color: theme.colors.textMuted,
  },
});
