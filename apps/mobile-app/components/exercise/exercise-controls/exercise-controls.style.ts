import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

type ControlStylesParams = {
  isPending: boolean;
};

export const getStyles = ({ isPending }: ControlStylesParams) =>
  StyleSheet.create({
    controlsWrap: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      flexDirection: 'row',
    },
    controlsBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: isPending ? 'center' : 'space-between',
      gap: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flex: 1,
    },
    controlBtnSecondary: {
      minWidth: theme.sizes.controlBtnMinWidth,
    },
    controlBtnSecondaryContent: {
      height: theme.sizes.controlBtnHeight,
      paddingHorizontal: theme.spacing.xxs,
      paddingVertical: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    },
    controlBtnSecondaryLabel: {
      marginVertical: 0,
      paddingVertical: 0,
      textAlignVertical: 'center',
      includeFontPadding: false,
    },
    controlBtnSecondaryContentReverse: {
      flexDirection: 'row-reverse',
    },
    controlBtnSecondaryIconLeft: {
      marginLeft: -8,
    },
    controlBtnSecondaryIconRight: {
      marginRight: -8,
    },
    controlBtnDisabled: {
      opacity: theme.opacity.disabled,
    },
  });
