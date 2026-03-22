import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SessionsScreen from '../session/sessions-screen/sessions-screen';
import SessionScreen from '../session/session-screen/session-screen';
import ExerciseScreen from '../exercise/exercise-screen/exercise-screen';
import NewSessionScreen from '../session/new-session-screen';
import AddSessionExercisesScreen from '../session/add-session-exercises-screen/add-session-exercises-screen';
import { API_BASE_URL } from '../../config/env';
import { HomeStackParamList } from '../../types/navigation';
import { useMobileAuthSession } from '@/hooks/use-mobile-auth-session';
import { useAuth } from '@/providers/auth-provider';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator(){
  const { accessToken } = useAuth();
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
            onOpenAddExercises={sessionId =>
              navigation.navigate('AddSessionExercises', { sessionId })
            }
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

      <HomeStack.Screen name="AddSessionExercises">
        {({ navigation, route }) => (
          <AddSessionExercisesScreen
            baseUrl={API_BASE_URL}
            sessionId={route.params.sessionId}
            accessToken={accessToken}
            onBack={() => navigation.goBack()}
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
