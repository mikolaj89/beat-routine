import { StyleSheet } from 'react-native';
import { theme } from '../../../../../../utils/theme';

export const styles = StyleSheet.create({
  skeletonWrap: {
    paddingHorizontal: theme.spacing.lg - 2,
    paddingTop: theme.spacing.xs,
    paddingBottom: 110,
    gap: theme.spacing.sm,
  },
  skeletonCard: {
    ...theme.card.base,
    overflow: 'hidden',
  },
  skeletonRow: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  skeletonLine: {
    height: theme.sizes.skeletonLineHeight,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.skeletonBase,
    width: '72%',
  },
  skeletonLineShort: {
    height: theme.sizes.skeletonLineShortHeight,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.skeletonAccent,
    width: '34%',
  },
});
