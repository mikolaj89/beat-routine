import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  skeletonWrap: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 4,
    gap: 12,
  },
  skeletonCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6F4',
    overflow: 'hidden',
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  skeletonAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFE8F6',
  },
  skeletonTextWrap: {
    flex: 1,
    gap: 8,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EFE8F6',
    width: '70%',
  },
  skeletonLineShort: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F3ECFA',
    width: '45%',
  },
});
