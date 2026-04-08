import { StyleSheet } from 'react-native';
import { theme } from '../../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    ...theme.card.base,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md - 2,
    paddingVertical: theme.spacing.md - 2,
    paddingHorizontal: theme.spacing.md - 2,
  },
  avatar: {
    width: theme.sizes.skeletonAvatarSize,
    height: theme.sizes.skeletonAvatarSize,
    borderRadius: theme.sizes.skeletonAvatarSize / 2,
    backgroundColor: theme.colors.skeletonBase,
  },
  textWrap: {
    flex: 1,
    gap: theme.spacing.xs + 2,
  },
  line: {
    height: theme.sizes.skeletonLineHeight,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.skeletonBase,
  },
  lineShort: {
    height: theme.sizes.skeletonLineShortHeight,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.skeletonAccent,
  },
});
