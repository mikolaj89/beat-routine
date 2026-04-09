import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import type { Exercise } from '@drum-scheduler/contracts';
import { useExercise } from '../../../hooks/use-exercise';
import ActiveExerciseView from '../active-exercise-view/active-exercise-view';
import ExerciseControls from '../exercise-controls/exercise-controls';
import { TopBar } from '../../top-bar/top-bar';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { ExerciseOverwiew } from './exercise-overwiew';
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
    handlePrev,
    handleNext,
    currentExercise,
    currentIndex,
  } = useExercise({ exercises: exercises, exerciseIndex });

  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title={currentExercise.name} onBack={onBack} />

        {mode === 'active' || mode === 'paused' ? (
          <ActiveExerciseView
            name={currentExercise.name}
            bpm={currentExercise.bpm}
            timeFormatted={timeFormatted}
          />
        ) : (
          <>
            <View style={styles.header}>
              <Text variant="titleLarge" style={styles.exerciseTitle}>
                {currentExercise.name}
              </Text>

              <View style={styles.titleRow}>
                <Text variant="bodyMedium" style={styles.sessionName}>
                  {sessionName}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={styles.exerciseIndexSeparator}
                >
                  •
                </Text>
                <Text variant="bodyMedium" style={styles.exerciseIndex}>
                  Exercise {currentIndex} / {totalExercises}
                </Text>
              </View>
            </View>

            <ExerciseOverwiew
              description={currentExercise.description}
              durationMinutes={currentExercise.durationMinutes}
              bpm={currentExercise.bpm}
            />
          </>
        )}

        <ExerciseControls
          isPrevDisabled={isPrevDisabled}
          isLastExercise={currentIndex === totalExercises}
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
