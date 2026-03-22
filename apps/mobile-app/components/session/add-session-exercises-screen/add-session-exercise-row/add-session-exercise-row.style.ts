import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pressable: {
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  cardSelected: {
    backgroundColor: '#E7E9ED',
  },
  cardDisabled: {
    opacity: 0.75,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
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
    marginTop: 2,
  },
  alreadyInSession: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 4,
  },
});
