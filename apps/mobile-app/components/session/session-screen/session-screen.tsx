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
  const hasExercises = Boolean(sessionExercises[0]);

  return (
    <ScreenContainer>
      <TopBar title="Session plan" onBack={onBack} />
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

        {sessionResult.data && sessionExercises.length > 0 && (
          <SessionPracticePlanSection
            totalDurationMinutes={sessionResult.data.totalDuration ?? 0}
            exercises={sessionExercises}
            isLoading={sessionResult.isLoading}
            hasError={Boolean(sessionResult.error)}
          />
        )}
        {sessionResult.data && (
          <SessionScreenActions
            hasExercises={hasExercises}
            onPressStartSession={() => {
              const firstExercise = sessionResult.data?.exercises?.[0];
              const sessionName = sessionResult.data?.name;
              if (firstExercise && sessionName && onStart) {
                onStart(sessionExercises, sessionName, 1);
              }
            }}
            onPressAddExercises={() => onOpenAddExercises?.(sessionId)}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
