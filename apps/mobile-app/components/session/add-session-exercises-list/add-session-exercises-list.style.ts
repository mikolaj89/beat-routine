import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  listFlex: {
    flex: 1,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },
  listContent: {
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  centerMessage: {
    paddingTop: theme.spacing.lg,
    fontSize: theme.typography.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
