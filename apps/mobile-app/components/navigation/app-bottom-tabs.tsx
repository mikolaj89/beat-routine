import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountScreen from '../account/account-screen';
import { RootTabParamList } from '../../types/navigation';
import { theme } from '../../utils/theme';
import { HomeStackNavigator } from './home-stack-navigator';
import { navigationTabBarStyle } from './navigation-tab-bar-style';
import { getHomeTabOptions } from './app-bottom-tabs.helper';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const iconName =
            route.name === 'Home'
              ? focused
                ? 'home'
                : 'home-outline'
              : focused
                ? 'account-circle'
                : 'account-circle-outline';

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        options={({ route }) => getHomeTabOptions(route)}
      >
        {() => <HomeStackNavigator />}
      </Tab.Screen>

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ tabBarLabel: 'Account', tabBarStyle: navigationTabBarStyle }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: theme.typography.small,
    fontWeight: '700',
  },
});
