import { useState } from 'react';
import { ExerciseState } from '../components/exercise/exercise-screen/exercise-screen.types';
import { useTimer } from './use-time-countdown';
import { getFormattedTime } from '../utils/date-time';
import { useMetronome } from './use-metronome';
import { metronomeOptions } from './use-metronome.constants';

export const useExercise = (exerciseDuration: number) => {
  const [mode, setMode] = useState<ExerciseState>('preview');
  const metronome = useMetronome(metronomeOptions);
  const { secondsLeft, startCountdown, stopCountdown, resetCountdown } =
    useTimer(exerciseDuration * 60);

  const isPauseDisabled = mode !== 'active';
  const isPlayDisabled = mode === 'active';
  const isPrevNextDisabled = mode !== 'preview';

  const timeFormatted = getFormattedTime(secondsLeft);

  const startExercise = () => {
    setMode('active');
    startCountdown();
    metronome.play();
  };

  const pauseExercise = () => {
    setMode('paused');
    stopCountdown();
    metronome.stop();
  };

  const finishExercise = () => {
    setMode('preview');
    resetCountdown(exerciseDuration * 60);
    metronome.stop();
  };

  return {
    startExercise,
    pauseExercise,
    finishExercise,
    mode,
    setMode,
    timeFormatted,
    isPauseDisabled,
    isPlayDisabled,
    isPrevNextDisabled,
  };
};
