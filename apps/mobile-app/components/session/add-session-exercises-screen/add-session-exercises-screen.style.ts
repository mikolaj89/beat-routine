import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchbar: {
    borderRadius: 999,
    backgroundColor: '#EFE8F6',
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  addButton: {
    width: '100%',
  },
  addButtonContent: {
    minHeight: 48,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonLabel: {
    marginVertical: 0,
    marginHorizontal: 24,
    paddingVertical: 14,
    lineHeight: 20,
  },
});
