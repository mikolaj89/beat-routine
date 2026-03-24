import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import type { Exercise } from '@drum-scheduler/contracts';
import {
  useRemoveExerciseFromSession,
  useReorderSessionExercises,
} from '@drum-scheduler/sdk';
import { getSessionScreenDraftChanges } from './session-screen-edit-mode-draft-helper';

export function useSessionScreenEditMode({
  baseUrl,
  sessionId,
  sessionExercises,
  hasSessionData,
}: {
  baseUrl: string;
  sessionId: number;
  sessionExercises: Exercise[];
  hasSessionData: boolean;
}) {
  const reorderSessionExercisesMutation = useReorderSessionExercises(
    baseUrl,
    sessionId,
  );
  const removeExerciseFromSessionMutation = useRemoveExerciseFromSession(
    baseUrl,
    sessionId,
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftExercises, setDraftExercises] = useState<Exercise[]>([]);
  const [saveErrorMessage, setSaveErrorMessage] = useState('');

  useEffect(() => {
    if (!isEditMode) {
      setDraftExercises(sessionExercises);
    }
  }, [isEditMode, sessionExercises]);

  const visibleExercises = isEditMode ? draftExercises : sessionExercises;
  const draftChanges = useMemo(
    () =>
      getSessionScreenDraftChanges({
        draftExercises,
        sessionExercises,
      }),
    [draftExercises, sessionExercises],
  );
  const { hasDraftChanges, hasReorderChanges, removedExerciseIds } = draftChanges;

  const isSavingChanges =
    reorderSessionExercisesMutation.isPending ||
    removeExerciseFromSessionMutation.isPending;

  const enterEditMode = useCallback(() => {
    setDraftExercises(sessionExercises);
    setSaveErrorMessage('');
    setIsEditMode(true);
  }, [sessionExercises]);

  const closeEditMode = useCallback(() => {
    if (!hasDraftChanges) {
      setIsEditMode(false);
      return;
    }

    Alert.alert('Discard changes?', 'Your unsaved session edits will be lost.', [
      { text: 'Keep editing', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          setDraftExercises(sessionExercises);
          setSaveErrorMessage('');
          setIsEditMode(false);
        },
      },
    ]);
  }, [hasDraftChanges, sessionExercises]);

  const removeDraftExercise = useCallback((exerciseId: number) => {
    setDraftExercises(previousExercises =>
      previousExercises.filter(exercise => exercise.id !== exerciseId),
    );
  }, []);

  const saveChanges = useCallback(async () => {
    if (!hasSessionData || isSavingChanges) {
      return;
    }

    if (!hasDraftChanges) {
      setIsEditMode(false);
      return;
    }

    setSaveErrorMessage('');

    try {
      for (const removedExerciseId of removedExerciseIds) {
        await removeExerciseFromSessionMutation.mutateAsync(removedExerciseId);
      }

      if (hasReorderChanges && draftExercises.length > 0) {
        await reorderSessionExercisesMutation.mutateAsync(draftExercises);
      }

      setSaveErrorMessage('');
      setIsEditMode(false);
    } catch {
      setSaveErrorMessage('Failed to save changes. Please try again.');
    }
  }, [
    draftExercises,
    hasDraftChanges,
    hasReorderChanges,
    hasSessionData,
    isSavingChanges,
    removedExerciseIds,
    removeExerciseFromSessionMutation,
    reorderSessionExercisesMutation,
  ]);

  return {
    isEditMode,
    visibleExercises,
    hasDraftChanges,
    isSavingChanges,
    saveErrorMessage,
    enterEditMode,
    closeEditMode,
    reorderDraftExercises: setDraftExercises,
    removeDraftExercise,
    saveChanges,
  };
}
