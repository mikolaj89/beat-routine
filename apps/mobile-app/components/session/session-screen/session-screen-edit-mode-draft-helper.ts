import type { Exercise } from '@drum-scheduler/contracts';

export function getSessionScreenDraftChanges({
  draftExercises,
  sessionExercises,
}: {
  draftExercises: Exercise[];
  sessionExercises: Exercise[];
}) {
  const hasDraftChanges =
    draftExercises.length !== sessionExercises.length ||
    draftExercises.some(
      (exercise, index) => exercise.id !== sessionExercises[index]?.id,
    );

  const sessionExerciseIds = sessionExercises.map(exercise => exercise.id);
  const draftExerciseIds = draftExercises.map(exercise => exercise.id);
  const draftExerciseIdsSet = new Set(draftExerciseIds);

  const removedExerciseIds = sessionExerciseIds.filter(
    exerciseId => !draftExerciseIdsSet.has(exerciseId),
  );
  const retainedSessionExerciseIds = sessionExerciseIds.filter(exerciseId =>
    draftExerciseIdsSet.has(exerciseId),
  );
  const hasReorderChanges = draftExerciseIds.some(
    (exerciseId, index) => exerciseId !== retainedSessionExerciseIds[index],
  );

  return {
    hasDraftChanges,
    hasReorderChanges,
    removedExerciseIds,
  };
}
