import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: theme.spacing.lg - 2,
    paddingTop: theme.spacing.xs,
    paddingBottom: 4,
    gap: theme.spacing.md - 2,
  },
});
