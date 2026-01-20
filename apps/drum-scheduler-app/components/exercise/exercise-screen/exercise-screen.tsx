import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { Exercise } from '@drum-scheduler/contracts';
import { useExercise } from '../../../hooks/use-exercise';
import ActiveExerciseView from '../active-exercise-view/active-exercise-view';
import ExerciseControls from '../exercise-controls/exercise-controls';
import { styles, theme } from './exercise-screen.style';

export default function ExerciseScreen({
  exercise,
  sessionName,
  exerciseIndex,
  totalExercises,
  onBack,
}: {
  exercise: Exercise;
  sessionName: string;
  exerciseIndex: number;
  totalExercises: number;
  onBack: () => void;
}) {
  const duration = exercise.durationMinutes ?? 0;
  const bpm = exercise.bpm ?? 0;
  const notes = exercise.description?.trim() || '—';
  const {
    startExercise,
    pauseExercise,
    finishExercise,
    mode,
    timeFormatted,
    isPauseDisabled,
    isPlayDisabled,
    isPrevNextDisabled,
  } = useExercise(duration);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <TopBar title="Exercise" onBack={onBack} />

        {mode === 'active' || mode === 'paused' ? (
          <ActiveExerciseView
            name={exercise.name}
            bpm={bpm}
            timeFormatted={timeFormatted}
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.sessionName}>{sessionName}</Text>
              <View style={styles.titleRow}>
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>
                <Text style={styles.exerciseProgress}>
                  Exercise {exerciseIndex} / {totalExercises}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Notes</Text>
              <Text style={styles.cardValue}>{notes}</Text>

              <View style={styles.row}>
                <View style={styles.kv}>
                  <Text style={styles.kLabel}>Duration</Text>
                  <Text style={styles.kValue}>{duration} min</Text>
                </View>
                <View style={styles.kv}>
                  <Text style={styles.kLabel}>BPM</Text>
                  <Text style={styles.kValue}>{bpm}</Text>
                </View>
              </View>
            </View>
          </>
        )}

        <ExerciseControls
          isPrevNextDisabled={isPrevNextDisabled}
          isPlayDisabled={isPlayDisabled}
          isPauseDisabled={isPauseDisabled}
          onPrev={() => {}}
          onPlay={() => {
            startExercise();
          }}
          onPause={() => {
            pauseExercise();
          }}
          onFinish={() => {
            finishExercise();
          }}
          onNext={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.topBar}>
      <Pressable style={styles.iconBtn} onPress={onBack}>
        <Icon name="arrow-back" size={24} color={theme.colors.icon} />
      </Pressable>

      <Text style={styles.topBarTitle}>{title}</Text>

      <View style={styles.iconBtn} />
    </View>
  );
}
