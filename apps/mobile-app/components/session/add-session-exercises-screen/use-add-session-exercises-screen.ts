import { useCallback, useMemo, useState } from 'react';
import {
  useAddExerciseToSession,
  useExercisesQuery,
  useSessionQuery,
} from '@drum-scheduler/sdk';
import { toggleExerciseSelection } from './add-session-exercises-selection-helper';

export type AddSessionExercisesListStatus = 'loading' | 'error' | 'ready';

export function useAddSessionExercisesScreen({
  baseUrl,
  sessionId,
  accessToken,
  onBack,
}: {
  baseUrl: string;
  sessionId: number;
  accessToken: string | null;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const exercisesResult = useExercisesQuery(
    baseUrl,
    { name: searchQuery },
    { debounceMs: 450 },
  );
  const sessionResult = useSessionQuery(baseUrl, sessionId, { accessToken });

  const addMutation = useAddExerciseToSession({
    baseUrl,
    sessionId,
    accessToken,
  });

  const exercises = exercisesResult.data ?? [];
  const isLoadingExercises = exercisesResult.isLoading;
  const exercisesError = exercisesResult.error;

  const alreadyInSessionIds = useMemo(() => {
    const list = sessionResult.data?.exercises ?? [];
    return new Set(list.map(e => e.id));
  }, [sessionResult.data?.exercises]);

  const toggleSelection = useCallback((exerciseId: number) => {
    setSelectedIds(prev => toggleExerciseSelection(prev, exerciseId));
  }, []);

  const onAddToSession = useCallback(async () => {
    if (selectedIds.length === 0) return;
    try {
      for (const id of selectedIds) {
        await addMutation.mutateAsync(String(id));
      }
      onBack();
    } catch {
      // Failure is available on `addMutation.error` for UI
    }
  }, [addMutation, onBack, selectedIds]);

  const addSessionErrorMessage = useMemo(() => {
    const err = addMutation.error;
    if (err == null) return null;
    return err instanceof Error ? err.message : 'Failed to add exercises';
  }, [addMutation.error]);

  const resetAddSessionError = useCallback(() => {
    addMutation.reset();
  }, [addMutation]);

  const listStatus: AddSessionExercisesListStatus = isLoadingExercises
    ? 'loading'
    : exercisesError
      ? 'error'
      : 'ready';

  const trimmedSearch = searchQuery.trim();
  const emptyStatus =
    listStatus === 'ready' && exercises.length === 0
      ? trimmedSearch === ''
        ? ('noLibrary' as const)
        : ('noMatch' as const)
      : null;

  const errorMessage =
    exercisesError instanceof Error
      ? exercisesError.message
      : 'Failed to load exercises';

  const addButtonDisabled =
    selectedIds.length === 0 || addMutation.isPending || !accessToken;

  return {
    searchQuery,
    setSearchQuery,
    exercises,
    listStatus,
    emptyStatus,
    errorMessage,
    alreadyInSessionIds,
    selectedIds,
    toggleSelection,
    onAddToSession,
    isAddPending: addMutation.isPending,
    addButtonDisabled,
    addSessionErrorMessage,
    resetAddSessionError,
  };
}
