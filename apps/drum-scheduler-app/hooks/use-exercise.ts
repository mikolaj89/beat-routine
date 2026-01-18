import { useState } from 'react';
import { ExerciseState } from '../components/exercise/exercise-screen/exercise-screen.types';
import { useTimer } from './use-time-countdown';
import { getFormattedTime } from '../utils/date-time';

export const useExercise = (exerciseDuration: number) => {
  const [mode, setMode] = useState<ExerciseState>('preview');

  const { secondsLeft, startCountdown, stopCountdown, resetCountdown } =
    useTimer(exerciseDuration * 60);

  const timeFormatted = getFormattedTime(secondsLeft);

  const startExercise = () => {
    setMode('active');
    startCountdown();
    // Additional logic to start timer can be added here
  };

  const pauseExercise = () => {
    setMode('paused');
    stopCountdown();
    // Additional logic to pause timer can be added here
  };

  const finishExercise = () => {
    setMode('preview');
    resetCountdown(exerciseDuration * 60);
    // Additional logic to resume timer can be added here
  };

  return {
    startExercise,
    pauseExercise,
    finishExercise,
    mode,
    setMode,
    timeFormatted,
  };
};
