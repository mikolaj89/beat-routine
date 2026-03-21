import { NavigatorScreenParams } from "@react-navigation/native";
import { Exercise } from "@drum-scheduler/contracts";

export type HomeStackParamList = {
  Sessions: undefined;
  NewSession: undefined;
  Session: { sessionId: number };
  AddSessionExercises: { sessionId: number };
  Exercise: {
    exercises: Exercise[];
    sessionName: string;
    exerciseIndex: number;
  };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: NavigatorScreenParams<RootTabParamList> | undefined;
};
