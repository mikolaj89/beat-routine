import { Exercise } from "@drum-scheduler/contracts";

export type RootStackParamList = {
  Sessions: undefined;
  Session: { sessionId: number };
  Exercise: {
    exercise: Exercise;
    sessionName: string;
    exerciseIndex: number;
    totalExercises: number;
  };
};
