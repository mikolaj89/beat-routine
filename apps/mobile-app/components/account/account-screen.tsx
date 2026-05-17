import { View } from 'react-native';
import React from 'react';
import { Avatar, Surface, Text } from 'react-native-paper';
import { Button } from '@/components/button';
import { ScreenContainer } from '../layout/screen-container/screen-container';
import { TopBar } from '../top-bar/top-bar';
import { theme } from '../../utils/theme';
import { styles } from './account-screen.style';
import { useAccountScreen } from './use-account-screen';
import { getAndroidBuildTimeLabel } from '@/config/build-info';

export default function AccountScreen() {
  const { currentUserEmail, currentUserRole, isCurrentUserLoading, logout } =
    useAccountScreen();

  return (
    <ScreenContainer>
      <TopBar title="Account" />

      <View style={styles.content}>
        <Surface elevation={1} style={styles.card}>
          <Avatar.Icon
            size={56}
            icon="account-outline"
            style={styles.avatar}
            color={theme.colors.text}
          />
          <Text variant="headlineSmall" style={styles.title}>
            Account
          </Text>
          <Text variant="titleMedium" style={styles.email}>
            {isCurrentUserLoading
              ? 'Loading email...'
              : currentUserEmail ?? 'Email unavailable'}
          </Text>
          <Text variant="bodyMedium" style={styles.role}>
            {isCurrentUserLoading ? 'Loading role...' : currentUserRole ?? 'Role unavailable'}
          </Text>
          <Text variant="bodyMedium" style={styles.body}>
            Your profile and app settings will live here. For now, you can use
            this screen to access account actions like signing out.
          </Text>
          <Button
            type="Primary"
            mode="tonal"
            label="Log out"
            onPress={() => void logout()}
            style={styles.logoutButton}
          />
          <Text
            variant="bodySmall"
            style={styles.buildStamp}
            testID="android-build-stamp"
          >
            Build (Android): {getAndroidBuildTimeLabel()}
          </Text>
        </Surface>
      </View>
    </ScreenContainer>
  );
}
