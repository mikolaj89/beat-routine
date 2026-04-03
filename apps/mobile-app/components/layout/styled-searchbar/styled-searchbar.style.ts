import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchbar: {
    height: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.searchBarBg,
    borderWidth: 0,
    borderColor: theme.colors.searchBarBorder,
    shadowColor: theme.colors.searchBarShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
  },
});
