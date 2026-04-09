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
  });
