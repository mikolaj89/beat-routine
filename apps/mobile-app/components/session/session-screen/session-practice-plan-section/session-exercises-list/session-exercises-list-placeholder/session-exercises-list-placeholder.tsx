import React from 'react';
import { ListSkeletonPlaceholder } from '../../../../../layout/list-skeleton-placeholder';

export function SessionExercisesListPlaceholder({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <ListSkeletonPlaceholder
      count={count}
      lineWidths={['72%', '34%']}
      style={{ paddingBottom: 110, gap: 10 }}
    />
  );
}
