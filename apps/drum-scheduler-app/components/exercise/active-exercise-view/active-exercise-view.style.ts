import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  activeWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: 120,
    gap: 8,
  },
  activeTitle: {
    fontSize: theme.typography.cardTitle,
    fontWeight: '800',
    color: theme.colors.text,
  },
  activeMeta: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  activeTimer: {
    fontSize: 64,
    fontWeight: '300',
    color: theme.colors.text,
    letterSpacing: 2,
    marginTop: 10,
  },
});
