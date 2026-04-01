import React from 'react';
import { ListSkeletonPlaceholder } from '../../../layout/list-skeleton-placeholder';

export function SessionLoadingPlaceholder({
  isLoading,
  count = 3,
}: {
  isLoading: boolean;
  count?: number;
}) {
  if (!isLoading) return null;

  return (
    <ListSkeletonPlaceholder
      count={count}
      isAvatarVisible
      lineWidths={['70%', '45%']}
    />
  );
}
