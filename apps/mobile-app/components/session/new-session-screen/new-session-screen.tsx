import React, { useState } from 'react';
import { View } from 'react-native';
import { useCreateSession } from '@drum-scheduler/sdk';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { TopBar } from '../../top-bar/top-bar';
import { NewSessionFormData } from './new-session-screen-helper';
import { NewSessionForm } from './new-session-form';
import { styles } from './new-session-screen.style';

export default function NewSessionScreen({
  baseUrl,
  accessToken,
  onBack,
  onOpenSession,
}: {
  baseUrl: string;
  accessToken: string | null;
  onBack: () => void;
  onOpenSession?: (sessionId: number) => void;
}) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createSessionMutation = useCreateSession(baseUrl, { accessToken });
  const isSubmitting = createSessionMutation.isPending;

  const onSubmit = async (formData: NewSessionFormData) => {
    setSubmitError(null);

    try {
      const createdSession = await createSessionMutation.mutateAsync({
        name: formData.name.trim(),
        notes: null,
      });

      const createdSessionId = createdSession.data?.id;
      if (!createdSessionId) {
        throw new Error('Could not resolve the new session id.');
      }

      onOpenSession?.(createdSessionId);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to create session.',
      );
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title="New Session" onBack={onBack} />
        <NewSessionForm
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={onSubmit}
        />
      </View>
    </ScreenContainer>
  );
}
