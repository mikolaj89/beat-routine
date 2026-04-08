import { StyleSheet } from 'react-native';
import { theme } from '../../../../utils/theme';

export const styles = StyleSheet.create({
  skeletonWrap: {
    paddingHorizontal: theme.spacing.lg - 2,
    paddingTop: theme.spacing.xs,
    paddingBottom: 4,
    gap: theme.spacing.md - 2,
  },
  skeletonCard: {
    ...theme.card.base,
    overflow: 'hidden',
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md - 2,
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.md - 2,
  },
  skeletonAvatar: {
    width: theme.sizes.skeletonAvatarSize,
    height: theme.sizes.skeletonAvatarSize,
    borderRadius: theme.sizes.skeletonAvatarSize / 2,
    backgroundColor: theme.colors.skeletonBase,
  },
  skeletonTextWrap: {
    flex: 1,
    gap: theme.spacing.xs + 2,
  },
  skeletonLine: {
    height: theme.sizes.skeletonLineHeight,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.skeletonBase,
    width: '70%',
  },
  skeletonLineShort: {
    height: theme.sizes.skeletonLineShortHeight,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.skeletonAccent,
    width: '45%',
  },
});
