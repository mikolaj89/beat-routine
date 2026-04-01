import type {
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { ButtonProps } from 'react-native-paper';

export type ButtonType = 'Primary';
export type ButtonMode = 'filled' | 'outlined' | 'tonal' | 'text';

export type ButtonComponentProps = Omit<
  ButtonProps,
  'children' | 'contentStyle' | 'icon' | 'labelStyle' | 'mode' | 'style'
> & {
  type: ButtonType;
  mode?: ButtonMode;
  label: string;
  icon?: ButtonProps['icon'];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};
