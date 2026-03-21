import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SessionsScreen from '../session/sessions-screen/sessions-screen';
import SessionScreen from '../session/session-screen/session-screen';
import ExerciseScreen from '../exercise/exercise-screen/exercise-screen';
import NewSessionScreen from '../session/new-session-screen';
import { API_BASE_URL } from '../../config/env';
import { HomeStackParamList } from '../../types/navigation';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator({
  accessToken,
}: {
  accessToken: string | null;
}) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Sessions">
        {({ navigation }) => (
          <SessionsScreen
            accessToken={accessToken}
            onOpenSession={sessionId =>
              navigation.navigate('Session', { sessionId })
            }
            onOpenCreateSession={() => navigation.navigate('NewSession')}
          />
        )}
      </HomeStack.Screen>

      <HomeStack.Screen name="NewSession">
        {({ navigation }) => (
          <NewSessionScreen
            baseUrl={API_BASE_URL}
            accessToken={accessToken}
            onBack={() => navigation.goBack()}
            onOpenSession={sessionId =>
              navigation.replace('Session', { sessionId })
            }
          />
        )}
      </HomeStack.Screen>

      <HomeStack.Screen name="Session">
        {({ navigation, route }) => (
          <SessionScreen
            baseUrl={API_BASE_URL}
            sessionId={route.params.sessionId}
            accessToken={accessToken}
            onBack={() => navigation.goBack()}
            onStart={(exercises, sessionName, exerciseIndex) =>
              navigation.navigate('Exercise', {
                exercises,
                sessionName,
                exerciseIndex,
              })
            }
          />
        )}
      </HomeStack.Screen>

      <HomeStack.Screen name="Exercise">
        {({ navigation, route }) => (
          <ExerciseScreen
            exercises={route.params.exercises}
            sessionName={route.params.sessionName}
            exerciseIndex={route.params.exerciseIndex}
            onBack={() => navigation.goBack()}
          />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
