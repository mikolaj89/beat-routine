import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: 120,
  },
  emptyText: {
    paddingTop: theme.spacing.md,
    color: theme.colors.textMuted,
  },
});
