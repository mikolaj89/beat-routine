import { View } from 'react-native';
import React from 'react';
import { Avatar, Button, Surface, Text } from 'react-native-paper';
import { ScreenContainer } from '../layout/screen-container/screen-container';
import { TopBar } from '../top-bar/top-bar';
import { useAuth } from '../../providers/auth-provider';
import { styles } from './account-screen.style';

export default function AccountScreen() {
  const { logout } = useAuth();

  return (
    <ScreenContainer>
      <TopBar title="Account" onLogout={logout} />

      <View style={styles.content}>
        <Surface elevation={1} style={styles.card}>
          <Avatar.Icon
            size={56}
            icon="account-outline"
            style={styles.avatar}
            color="black"
          />
          <Text variant="headlineSmall" style={styles.title}>
            Account
          </Text>
          <Text variant="bodyMedium" style={styles.body}>
            Your profile and app settings will live here. For now, you can use
            this screen to access account actions like signing out.
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => void logout()}
            style={styles.logoutButton}
          >
            Log out
          </Button>
        </Surface>
      </View>
    </ScreenContainer>
  );
}
