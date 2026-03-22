/**
 * Toggles an exercise id in selection while preserving first-seen order
 * (selection order for batch add).
 */
export function toggleExerciseSelection(
  orderedIds: number[],
  exerciseId: number,
): number[] {
  const index = orderedIds.indexOf(exerciseId);
  if (index === -1) {
    return [...orderedIds, exerciseId];
  }
  return orderedIds.filter(id => id !== exerciseId);
}
