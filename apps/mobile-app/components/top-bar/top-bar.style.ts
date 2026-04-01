import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';

export const styles = StyleSheet.create({
  appbar: {
    marginTop: 0,
    paddingHorizontal: 4,
    backgroundColor: 'transparent',
    elevation: theme.elevation.none,
    shadowColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  rightAction: {
    margin: 0,
    padding: 0,
  },
});
