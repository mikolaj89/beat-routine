import type {
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { ButtonProps, IconSource } from 'react-native-paper';

export type ButtonType = 'Primary';

export type ButtonComponentProps = Omit<
  ButtonProps,
  'children' | 'contentStyle' | 'icon' | 'labelStyle' | 'mode' | 'style'
> & {
  type: ButtonType;
  label: string;
  icon?: IconSource;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};
