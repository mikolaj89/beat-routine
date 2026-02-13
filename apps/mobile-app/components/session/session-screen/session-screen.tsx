import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  
  View,
} from 'react-native';
import { Button, Divider } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { useSessionQuery } from '@drum-scheduler/sdk';
import { TopBar } from '../../top-bar/top-bar';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { ExerciseCard } from './exercise-card/exercise-card';
import { styles } from './session-screen.style';
import { Text } from 'react-native-paper';

export default function SessionScreen({
  baseUrl,
  sessionId,
  onBack,
  onStart,
}: {
  baseUrl: string;
  sessionId: number;
  onBack: () => void;
  onStart?: (
    exercises: Exercise[],
    sessionName: string,
    exerciseIndex: number,
  ) => void;
}) {
  const sessionResult = useSessionQuery(baseUrl, sessionId);

  const renderItem = ({ item }: ListRenderItemInfo<Exercise>) => {
    return <ExerciseCard exercise={item} />;
  };

  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title={sessionResult.data?.name} onBack={onBack} />

        {sessionResult.isLoading ? (
          <Text style={styles.sectionTitle}>Loading session…</Text>
        ) : sessionResult.error ? (
          <Text style={styles.sectionTitle}>
            {sessionResult.error instanceof Error
              ? sessionResult.error.message
              : 'Failed to load session'}
          </Text>
        ) : null}

        {sessionResult.data ? (
          <View style={styles.header}>
            <Text style={styles.sessionMeta}>
              Total duration: {sessionResult.data.totalDuration ?? 0} min
            </Text>
          </View>
        ) : null}
        <Divider horizontalInset={true}  />
        <Text style={styles.listTitle}>Practice session plan</Text>

        <FlatList
          data={sessionResult.data?.exercises ?? []}
          keyExtractor={e => e.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !sessionResult.isLoading && !sessionResult.error ? (
              <Text style={styles.emptyText}>
                No exercises in this session.
              </Text>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.ctaWrap}>
          <Button
            style={{ width: '100%' }}
            mode="contained"
            
            onPress={() => {
              const firstExercise = sessionResult.data?.exercises?.[0];
              const sessionName = sessionResult.data?.name;
              const exercises = sessionResult.data?.exercises ?? [];
              if (firstExercise && sessionName && onStart) {
                onStart(exercises, sessionName, 1);
              }
            }}
            disabled={!sessionResult.data?.exercises?.[0]}
            
          >
            Start Session
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}
