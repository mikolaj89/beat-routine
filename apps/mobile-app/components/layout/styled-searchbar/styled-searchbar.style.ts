import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchbar: {
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.searchBarBg,
    elevation: theme.elevation.none,
  },
  searchInput: {
    fontSize: theme.typography.searchInput,
  },
});
