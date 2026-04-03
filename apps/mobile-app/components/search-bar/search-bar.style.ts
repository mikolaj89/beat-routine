import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

export const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 12,
    height: 54,
    borderRadius: 16,
    backgroundColor: theme.colors.searchBarBg,
    borderWidth: 0,
    borderColor: theme.colors.searchBarBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    shadowColor: theme.colors.searchBarShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.searchBarText,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '400',
  },
});
