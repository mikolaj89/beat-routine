import React, { useMemo, useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import { FAB } from 'react-native-paper';
import { useSessionsQuery } from '@drum-scheduler/sdk';
import { Session } from '@drum-scheduler/contracts';
import { API_BASE_URL } from '../../../config/api';
import { SessionsHeader } from './sessions-header';
import { SessionsStatus } from './sessions-status';
import { SessionListItem } from './session-list-item';
import { styles } from './sessions-screen.style';

export default function SessionsScreen({
  onOpenSession,
}: {
  onOpenSession?: (sessionId: number) => void;
}) {
  const [query, setQuery] = useState('');

  const sessionsResult = useSessionsQuery(API_BASE_URL);

  const statusMessage = useMemo(() => {
    if (sessionsResult?.isLoading) return 'Loading sessions…';
    if (sessionsResult?.error)
      return sessionsResult.error.message || 'Failed to load sessions';
    if (sessionsResult?.data?.length === 0) return 'No sessions yet.';
    return null;
  }, [sessionsResult?.isLoading, sessionsResult?.error, sessionsResult?.data]);

  const renderItem = ({ item }: ListRenderItemInfo<Session>) => (
    <SessionListItem session={item} onPress={() => onOpenSession?.(item.id)} />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <SessionsHeader query={query} onChangeQuery={setQuery} />

        <SessionsStatus
          message={statusMessage}
          isLoading={Boolean(sessionsResult?.isLoading)}
        />

        <FlatList
          data={sessionsResult?.data ?? []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <FAB icon="plus" style={styles.fab} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
