import { StyleSheet } from 'react-native';
import { theme } from '../../utils/theme';
export const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#EDE4F5',
    marginTop: 0,
    paddingHorizontal: 4,
  },
  content: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  drawerModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    flex: 1,
    paddingTop: 8,
    justifyContent: 'flex-start',
  },
  drawerItem: {
    color: theme.colors.text,
  },
});
