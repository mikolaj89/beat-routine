import type { Exercise } from '@drum-scheduler/contracts';
import { getSessionScreenDraftChanges } from './session-screen-edit-mode-draft-helper';

const exerciseA: Exercise = {
  id: 1,
  name: 'A',
  categoryId: null,
  description: null,
  durationMinutes: 5,
  bpm: 100,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const exerciseB: Exercise = {
  id: 2,
  name: 'B',
  categoryId: null,
  description: null,
  durationMinutes: 6,
  bpm: 110,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('getSessionScreenDraftChanges', () => {
  it('returns no changes for identical draft and session lists', () => {
    const result = getSessionScreenDraftChanges({
      draftExercises: [exerciseA, exerciseB],
      sessionExercises: [exerciseA, exerciseB],
    });

    expect(result.hasDraftChanges).toBe(false);
    expect(result.hasReorderChanges).toBe(false);
    expect(result.removedExerciseIds).toEqual([]);
  });

  it('detects removed exercises', () => {
    const result = getSessionScreenDraftChanges({
      draftExercises: [exerciseA],
      sessionExercises: [exerciseA, exerciseB],
    });

    expect(result.hasDraftChanges).toBe(true);
    expect(result.hasReorderChanges).toBe(false);
    expect(result.removedExerciseIds).toEqual([2]);
  });

  it('detects reorder changes', () => {
    const result = getSessionScreenDraftChanges({
      draftExercises: [exerciseB, exerciseA],
      sessionExercises: [exerciseA, exerciseB],
    });

    expect(result.hasDraftChanges).toBe(true);
    expect(result.hasReorderChanges).toBe(true);
    expect(result.removedExerciseIds).toEqual([]);
  });
});
