import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.sm,
  },
  actionsWrap: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: theme.spacing.md,
  },
  searchbar: {
    borderRadius: 999,
    backgroundColor: '#EFE8F6',
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
  },
});
