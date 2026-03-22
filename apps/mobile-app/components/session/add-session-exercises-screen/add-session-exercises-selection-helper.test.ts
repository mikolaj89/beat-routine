import { toggleExerciseSelection } from './add-session-exercises-selection-helper';

describe('toggleExerciseSelection', () => {
  it('appends id when not present', () => {
    expect(toggleExerciseSelection([], 1)).toEqual([1]);
    expect(toggleExerciseSelection([2], 1)).toEqual([2, 1]);
  });

  it('removes id when present', () => {
    expect(toggleExerciseSelection([1, 2, 3], 2)).toEqual([1, 3]);
    expect(toggleExerciseSelection([1], 1)).toEqual([]);
  });

  it('preserves order for remaining ids', () => {
    expect(toggleExerciseSelection([3, 1, 4], 1)).toEqual([3, 4]);
  });
});
