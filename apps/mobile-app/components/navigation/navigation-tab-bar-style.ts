import { Platform } from 'react-native';
import { theme } from '../../utils/theme';

export const navigationTabBarStyle = {
  height: Platform.OS === 'ios'
    ? theme.platform.tabBarHeight.ios
    : theme.platform.tabBarHeight.android,
  paddingTop: theme.spacing.xs + 2,
  paddingBottom: Platform.OS === 'ios'
    ? theme.platform.tabBarPaddingBottom.ios
    : theme.platform.tabBarPaddingBottom.android,
  backgroundColor: theme.colors.surface,
  borderTopColor: theme.colors.border,
};
