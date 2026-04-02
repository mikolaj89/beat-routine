import React from 'react';
import { View } from 'react-native';
import type { Exercise } from '@drum-scheduler/contracts';
import { useSessionQuery } from '@drum-scheduler/sdk';
import { Text } from 'react-native-paper';
import { TopBar } from '../../top-bar/top-bar';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { SessionPracticePlanSection } from './session-practice-plan-section/session-practice-plan-section';
import { SessionScreenActions } from './session-screen-actions/session-screen-actions';
import { styles } from './session-screen.style';
import { useSessionScreenEditMode } from './use-session-screen-edit-mode';
import { useSessionScreenDeleteAction } from './use-session-screen-delete-action';
import { useSessionTabBarVisibility } from './use-session-screeen-tab-bar-visibility';

export default function SessionScreen({
  baseUrl,
  sessionId,
  accessToken,
  onBack,
  onStart,
  onOpenAddExercises,
}: {
  baseUrl: string;
  sessionId: number;
  accessToken: string | null;
  onBack: () => void;
  onStart?: (
    exercises: Exercise[],
    sessionName: string,
    exerciseIndex: number,
  ) => void;
  onOpenAddExercises?: (sessionId: number) => void;
}) {
  const sessionResult = useSessionQuery(baseUrl, sessionId, { accessToken });
  const sessionExercises = sessionResult.data?.exercises ?? [];
  const {
    isEditMode,
    visibleExercises,
    hasDraftChanges,
    isSavingChanges,
    saveErrorMessage,
    enterEditMode,
    closeEditMode,
    reorderDraftExercises,
    removeDraftExercise,
    saveChanges,
  } = useSessionScreenEditMode({
    baseUrl,
    sessionId,
    sessionExercises,
    hasSessionData: Boolean(sessionResult.data),
  });
  const { confirmDeleteSession, deleteErrorMessage, isDeletingSession } =
    useSessionScreenDeleteAction({
      baseUrl,
      sessionId,
      accessToken,
      onDeleteSuccess: onBack,
    });
  const hasExercises = Boolean(visibleExercises[0]);
  useSessionTabBarVisibility({ isEditMode });

  return (
    <ScreenContainer>
      <TopBar
        title="Session plan"
        onBack={isEditMode ? closeEditMode : onBack}
        backIcon={isEditMode ? 'close' : 'arrow-left'}
        onEdit={isEditMode ? undefined : () => enterEditMode()}
        onDelete={
          isEditMode || isDeletingSession ? undefined : confirmDeleteSession
        }
      />
      <View style={styles.screen}>
        {sessionResult.isLoading ? (
          <Text style={styles.sectionTitle}>Loading session…</Text>
        ) : sessionResult.error ? (
          <Text style={styles.sectionTitle}>
            {sessionResult.error instanceof Error
              ? sessionResult.error.message
              : 'Failed to load session'}
          </Text>
        ) : null}

        {saveErrorMessage ? (
          <Text style={styles.sectionTitle}>{saveErrorMessage}</Text>
        ) : null}
        {deleteErrorMessage ? (
          <Text style={styles.sectionTitle}>{deleteErrorMessage}</Text>
        ) : null}

        
          <Text variant="labelLarge" style={styles.sessionName}>{sessionResult.data?.name}</Text>
        
        {sessionResult.data && (visibleExercises.length > 0 || isEditMode) && (
          <SessionPracticePlanSection
            totalDurationMinutes={sessionResult.data.totalDuration ?? 0}
            exercises={visibleExercises}
            isLoading={sessionResult.isLoading || sessionResult.isFetching}
            hasError={Boolean(sessionResult.error)}
            isEditMode={isEditMode}
            onReorderExercises={reorderDraftExercises}
            onRemoveExercise={removeDraftExercise}
          />
        )}
        {sessionResult.data && (
          <SessionScreenActions
            isEditMode={isEditMode}
            hasExercises={hasExercises}
            onPressStartSession={() => {
              const firstExercise = visibleExercises[0];
              const sessionName = sessionResult.data?.name;
              if (firstExercise && sessionName && onStart) {
                onStart(visibleExercises, sessionName, 1);
              }
            }}
            onPressAddExercises={() => onOpenAddExercises?.(sessionId)}
            onPressSaveChanges={() => {
              void saveChanges();
            }}
            isSavingChanges={isSavingChanges}
            isSaveChangesDisabled={!hasDraftChanges}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
