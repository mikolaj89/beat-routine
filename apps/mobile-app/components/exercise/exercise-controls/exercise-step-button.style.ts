import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

const typography = {
  buttonLabel: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: 16,
  } as const
}

export const styles = StyleSheet.create({
  button: {
    minWidth: theme.sizes.controlBtnMinWidth,
  },
  buttonDisabled: {
    opacity: theme.opacity.disabled,
  },
  content: {
    height: theme.sizes.controlBtnHeight,
    paddingHorizontal: theme.spacing.xxs,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  contentReversed: {
    flexDirection: 'row-reverse',
  },
  label: {
    ...typography.buttonLabel,
    marginVertical: 0,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  iconLeading: {
    marginLeft: -8,
  },
  iconTrailing: {
    marginRight: -8,
  },
});
