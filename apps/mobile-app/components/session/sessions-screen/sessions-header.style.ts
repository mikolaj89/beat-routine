import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
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
