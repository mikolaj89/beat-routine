import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  screen: { flex: 1 },

  sectionTitle: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});
