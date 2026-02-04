import { StyleSheet } from 'react-native';

type  ControlStylesParams = {
  isPending: boolean;
} 

export const getStyles = ({ isPending }: ControlStylesParams ) => StyleSheet.create({
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
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flex: 1,

  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnSecondary: {
    
    minWidth: 80,
  },
  controlBtnSecondaryContent: {
    height: 36,
    paddingHorizontal: 2,
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
    opacity: 0.45,
  },
});
