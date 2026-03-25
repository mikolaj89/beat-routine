import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useDeleteSession } from '@drum-scheduler/sdk';

export function useSessionScreenDeleteAction({
  baseUrl,
  sessionId,
  accessToken,
  onDeleteSuccess,
}: {
  baseUrl: string;
  sessionId: number;
  accessToken: string | null;
  onDeleteSuccess: () => void;
}) {
  const deleteSessionMutation = useDeleteSession(baseUrl, { accessToken });
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const handleDeleteSession = useCallback(async () => {
    setDeleteErrorMessage('');

    try {
      await deleteSessionMutation.mutateAsync(sessionId);
      onDeleteSuccess();
    } catch {
      setDeleteErrorMessage('Failed to delete session. Please try again.');
    }
  }, [deleteSessionMutation, onDeleteSuccess, sessionId]);

  const confirmDeleteSession = useCallback(() => {
    Alert.alert(
      'Delete session?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            void handleDeleteSession();
          },
        },
      ],
      { cancelable: true },
    );
  }, [handleDeleteSession]);

  return {
    confirmDeleteSession,
    deleteErrorMessage,
    isDeletingSession: deleteSessionMutation.isPending,
  };
}
