import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6F4',
    overflow: 'hidden',
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardAvatar: {
    backgroundColor: '#E9E0F2',
  },
  cardTextWrap: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#2F2838',
  },
  cardMeta: {
    color: '#6E647B',
  },
  cardChevron: {
    margin: 0,
  },
});
