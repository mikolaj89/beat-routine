import { useEffect, useState } from 'react';
import { ExerciseState } from '../components/exercise/exercise-screen/exercise-screen.types';
import { useTimer } from './use-time-countdown';
import { getFormattedTime } from '../utils/date-time';
import { useMetronome } from './use-metronome';
import { metronomeOptions } from './use-metronome.constants';
import { Exercise } from '@drum-scheduler/contracts';
import { getFormattedExercise } from '../components/exercise/exercise.utils';

type UseExercise = {
  exercises: Exercise[];
  exerciseIndex: number;
};

export const useExercise = ({ exercises, exerciseIndex }: UseExercise) => {
  const [currentIndex, setCurrentIndex] = useState(exerciseIndex);

  const currentExercise = getFormattedExercise(exercises[currentIndex - 1]);
  const duration = currentExercise?.duration ?? 0;
  const totalExercises = exercises.length;

  const [mode, setMode] = useState<ExerciseState>('preview');
  const metronome = useMetronome(metronomeOptions);
  const { secondsLeft, startCountdown, stopCountdown, resetCountdown } =
    useTimer(duration * 60);


  const isPauseDisabled = mode !== 'active';
  const isPlayDisabled = mode === 'active';
  const isPrevNextDisabled = mode !== 'preview';

  const isPrevDisabled = currentIndex === 1 || isPrevNextDisabled;
  const isNextDisabled = currentIndex === totalExercises || isPrevNextDisabled;

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
    resetCountdown(duration * 60);
    metronome.stop();
  };

  useEffect(() => {
    setMode('preview');
    resetCountdown(duration * 60);
    metronome.stop();
  }, [duration]);

  const handlePrev = () => {
    if (isPrevNextDisabled) return;
    setCurrentIndex(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    if (isPrevNextDisabled) return;
    setCurrentIndex(prev => Math.min(totalExercises, prev + 1));
  };

   useEffect(() => {
    if (totalExercises === 0) return;
    if (currentIndex < 1) setCurrentIndex(1);
    if (currentIndex > totalExercises) setCurrentIndex(totalExercises);
  }, [currentIndex, totalExercises]);

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
    handlePrev,
    handleNext,
    currentExercise,
    currentIndex,
    isPrevDisabled,
    isNextDisabled,
  };
};
