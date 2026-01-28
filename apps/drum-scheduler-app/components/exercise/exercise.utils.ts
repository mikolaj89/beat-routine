import { Exercise } from "@drum-scheduler/contracts";

export const getFormattedExercise = (exercise: Exercise) => {
  const duration = exercise.durationMinutes ?? 0;
  const bpm = exercise.bpm ?? 0;
  const name = exercise.name ?? 'Untitled Exercise';
  const description = exercise.description?.trim() || '—';

  
  return {
    name,
    duration,
    bpm,
    description,
  };
}