import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    paddingTop: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.horizontalMargin,
    paddingBottom: Platform.OS === 'ios'
      ? theme.platform.tabBarPaddingBottom.ios
      : theme.platform.tabBarPaddingBottom.android,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
});
