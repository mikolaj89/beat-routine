import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { AuthProvider, useAuth } from './providers/auth-provider';
import BootSplash from 'react-native-bootsplash';
import { SplashScreen } from './components/splash/splash-screen';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './components/login/login-screen';
import { AppBottomTabs } from './components/navigation/app-bottom-tabs';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const paperTheme = {
  ...MD3LightTheme,
};

function App() {
  const isDarkMode = false;

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <AuthProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <AppContent />
            </AuthProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const { isAuthenticated, isRefreshing, isAuthSessionInitialized } =
    useAuth();

  const hasHiddenNativeSplashRef = useRef(false);

  useEffect(() => {
    if (!isAuthSessionInitialized || hasHiddenNativeSplashRef.current) {
      return;
    }

    hasHiddenNativeSplashRef.current = true;
    void BootSplash.hide({ fade: true });
  }, [isAuthSessionInitialized]);

  if (!isAuthSessionInitialized || isRefreshing) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="MainTabs">
              {() => <AppBottomTabs/>}
            </Stack.Screen>
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
