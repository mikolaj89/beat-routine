import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  skeletonWrap: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 110,
    gap: 10,
  },
  skeletonCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6F4',
    overflow: 'hidden',
  },
  skeletonRow: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EFE8F6',
    width: '72%',
  },
  skeletonLineShort: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F3ECFA',
    width: '34%',
  },
});
