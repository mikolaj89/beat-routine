import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchbarShadowWrap: {
    borderRadius: 16,
    backgroundColor: theme.colors.searchBarBg,
    shadowColor: theme.colors.searchBarShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  searchbar: {
    height: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.searchBarBg,
    borderWidth: 0,
    borderColor: theme.colors.searchBarBorder,
  },
  searchInput: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
  },
});
