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
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
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
            label="Schedule"
            icon="calendar"
            onPress={onDismiss}
          />
          <Drawer.Item
            theme={{ colors: { onSurfaceVariant: theme.colors.text } }}
            label="Settings"
            icon="cog"
            onPress={onDismiss}
          />
        </Drawer.Section>
      </Modal>
    </Portal>
  );
}
