import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  draggingCard: {
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragHandle: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2430',
  },
  meta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
});
