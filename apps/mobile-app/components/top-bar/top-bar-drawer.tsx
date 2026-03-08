import React from 'react';
import {
  Drawer,
  MD3LightTheme as PaperTheme,
  Modal,
  Portal,
} from 'react-native-paper';
import { styles } from './top-bar.style';
import { theme } from '@/utils/theme';

export function TopBarDrawer({
  visible,
  onDismiss,
  onLogout,
}: {
  visible: boolean;
  onDismiss: () => void;
  onLogout: () => void;
}) {
  const handleLogout = () => {
    onDismiss();
    onLogout();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        testID="topbar-drawer-modal"
        contentContainerStyle={[
          styles.drawerModal,
          { backgroundColor: PaperTheme.colors.background },
        ]}
      >
        <Drawer.Section showDivider={false}>
          <Drawer.Item
            theme={{ colors: { onSurfaceVariant: theme.colors.text } }}
            label="Logout"
            icon="logout"
            onPress={handleLogout}
          />
        </Drawer.Section>
      </Modal>
    </Portal>
  );
}
