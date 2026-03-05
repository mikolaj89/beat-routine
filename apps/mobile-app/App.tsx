import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SessionsScreen from './components/session/sessions-screen/sessions-screen';
import SessionScreen from './components/session/session-screen/session-screen';
import ExerciseScreen from './components/exercise/exercise-screen/exercise-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API_BASE_URL } from './config/api';
import { RootStackParamList } from './types/navigation';
import { AuthProvider, useAuth } from './providers/auth-provider';
import BootSplash from 'react-native-bootsplash';
import { SplashScreen } from './components/splash/splash-screen';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

import LoginScreen from './components/login/login-screen';

function AppContent() {
  const { accessToken, isAuthenticated, isRefreshing, isSessionInitialized } = useAuth();
  const baseUrl = API_BASE_URL;
  const hasHiddenNativeSplashRef = useRef(false);

  useEffect(() => {
    if (!isSessionInitialized || hasHiddenNativeSplashRef.current) {
      return;
    }

    hasHiddenNativeSplashRef.current = true;
    void BootSplash.hide({ fade: true });
  }, [isSessionInitialized]);

  if (!isSessionInitialized || isRefreshing) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <>
              <Stack.Screen name="Sessions">
                {({ navigation }) => (
                  <SessionsScreen
                    accessToken={accessToken}
                    onOpenSession={sessionId =>
                      navigation.navigate('Session', { sessionId })
                    }
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Session">
                {({ navigation, route }) => (
                  <SessionScreen
                    baseUrl={baseUrl}
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
              </Stack.Screen>

              <Stack.Screen name="Exercise">
                {({ navigation, route }) => (
                  <ExerciseScreen
                    exercises={route.params.exercises}
                    sessionName={route.params.sessionName}
                    exerciseIndex={route.params.exerciseIndex}
                    onBack={() => navigation.goBack()}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
