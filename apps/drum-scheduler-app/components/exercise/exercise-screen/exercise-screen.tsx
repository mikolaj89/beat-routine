import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { useExercise } from '../../../hooks/use-exercise';
import ActiveExerciseView from '../active-exercise-view/active-exercise-view';
import ExerciseControls from '../exercise-controls/exercise-controls';
import { TopBar } from '../../top-bar/top-bar';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { styles } from './exercise-screen.style';

export default function ExerciseScreen({
  exercises,
  sessionName,
  exerciseIndex,
  onBack,
}: {
  exercises: Exercise[];
  sessionName: string;
  exerciseIndex: number;
  onBack: () => void;
}) {
  const totalExercises = exercises.length;

  const {
    startExercise,
    pauseExercise,
    finishExercise,
    mode,
    timeFormatted,
    isPrevDisabled,
    isNextDisabled,
    handlePrev,
    handleNext,
    currentExercise,
    currentIndex,
  } = useExercise({ exercises: exercises, exerciseIndex });


  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title="Exercise" onBack={onBack} />

        {mode === 'active' || mode === 'paused' ? (
          <ActiveExerciseView
            name={currentExercise.name}
            bpm={currentExercise.bpm}
            timeFormatted={timeFormatted}
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text variant="labelSmall" style={styles.sessionName}>
                {sessionName}
              </Text>
              <View style={styles.titleRow}>
                <Text variant="titleMedium" style={styles.exerciseTitle}>
                  {currentExercise.name}
                </Text>
                <Text variant="bodyMedium">
                  Exercise {currentIndex} / {totalExercises}
                </Text>
              </View>
            </View>

            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text variant="labelSmall" style={styles.cardLabel}>
                  Notes
                </Text>
                <Text variant="bodyMedium">
                  {currentExercise.description}
                </Text>

                <View style={styles.row}>
                  <View style={styles.kv}>
                    <Text variant="labelSmall" style={styles.cardMetaLabel}>
                      Duration
                    </Text>
                    <Text variant="bodyMedium">
                      {currentExercise.durationMinutes} min
                    </Text>
                  </View>
                  <View style={styles.kv}>
                    <Text variant="labelSmall" style={styles.cardMetaLabel}>
                      BPM
                    </Text>
                    <Text variant="bodyMedium">{currentExercise.bpm}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </>
        )}

        <ExerciseControls
          
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          
          onPrev={handlePrev}
          onNext={handleNext}
          onPlay={startExercise}
          onPause={pauseExercise}
          onFinish={finishExercise}
          mode={mode}
          
        />
      </View>
    </ScreenContainer>
  );
}
