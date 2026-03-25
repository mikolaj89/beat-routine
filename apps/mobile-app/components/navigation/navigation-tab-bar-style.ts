import { Platform } from 'react-native';
import { theme } from '../../utils/theme';

export const navigationTabBarStyle = {
  height: Platform.OS === 'ios' ? 84 : 64,
  paddingTop: 8,
  paddingBottom: Platform.OS === 'ios' ? 24 : 10,
  backgroundColor: theme.colors.surface,
  borderTopColor: theme.colors.border,
};
