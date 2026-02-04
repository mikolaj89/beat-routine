import React, { useState } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { Text } from 'react-native-paper';
import { useSessionsQuery } from '@drum-scheduler/sdk';
import { Session } from '@drum-scheduler/contracts';
import { API_BASE_URL } from '../../../config/api';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { SessionsHeader } from './sessions-header';
import { SessionLoadingPlaceholder } from '../session-list/session-loading-placeholder/session-loading-placeholder';
import { SessionListItem } from '../session-list/session-list-item/session-list-item';
import { styles } from './sessions-screen.style';

export default function SessionsScreen({
  onOpenSession,
}: {
  onOpenSession?: (sessionId: number) => void;
}) {
  const [query, setQuery] = useState('');

  const sessionsResult = useSessionsQuery(API_BASE_URL);
  const sessions = sessionsResult?.data ?? [];
  const isLoading = Boolean(sessionsResult?.isLoading);
  const isEmpty = !isLoading && sessions.length === 0;

  const renderItem = ({ item }: ListRenderItemInfo<Session>) => (
    <SessionListItem session={item} onPress={() => onOpenSession?.(item.id)} />
  );

  return (
    <ScreenContainer>
      <SessionsHeader query={query} onChangeQuery={setQuery} />

      <SessionLoadingPlaceholder isLoading={isLoading} />

      {!isLoading && (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            isEmpty ? (
              <Text style={styles.emptyText}>No sessions found.</Text>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}
