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
import type { MD3Theme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './components/login/login-screen';
import { AppBottomTabs } from './components/navigation/app-bottom-tabs';
import { theme as appTheme } from './utils/theme';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 3,
  fonts: {
    ...MD3LightTheme.fonts,
    labelSmall: { ...MD3LightTheme.fonts.labelSmall, fontWeight: '700' },
    labelMedium: { ...MD3LightTheme.fonts.labelMedium, fontWeight: '700' },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontSize: 18,
      fontWeight: '700',
    },
  },
  colors: {
    ...MD3LightTheme.colors,
    background: appTheme.colors.bg,
    surface: appTheme.colors.surface,
    primary: appTheme.colors.primary,
    outline: appTheme.colors.border,
    onSurface: appTheme.colors.text,
    onSurfaceVariant: appTheme.colors.textMuted,
    error: appTheme.colors.error,
  },
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
                backgroundColor={appTheme.colors.bg}
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
  const { isAuthenticated, isRefreshing, isAuthSessionInitialized } = useAuth();

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
              {() => <AppBottomTabs />}
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
    backgroundColor: appTheme.colors.bg,
  },
});

export default App;
