import React, { ReactNode, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './top-bar.style';
import { TopBarDrawer } from './top-bar-drawer';

export function TopBar({
  title,
  onBack,
  onMenu,
  menuVisible,
  onMenuVisibleChange,
  onLogout,
  children,
}: {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
  menuVisible?: boolean;
  onMenuVisibleChange?: (visible: boolean) => void;
  onLogout: () => void;
  children?: ReactNode;
}) {
  const showTitle = Boolean(title) && !children;
  const showMenu = !onBack;

  const isMenuControlled = menuVisible !== undefined;
  const [internalMenuVisible, setInternalMenuVisible] = useState(false);
  const resolvedMenuVisible = isMenuControlled
    ? (menuVisible as boolean)
    : internalMenuVisible;

  const setMenuVisible = useCallback(
    (nextVisible: boolean) => {
      onMenuVisibleChange?.(nextVisible);
      if (!isMenuControlled) {
        setInternalMenuVisible(nextVisible);
      }
    },
    [isMenuControlled, onMenuVisibleChange],
  );

  const handleDismiss = useCallback(() => {
    setMenuVisible(false);
  }, [setMenuVisible]);

  return (
    <>
      <Appbar.Header
        mode="small"
        elevated
        statusBarHeight={0}
        style={styles.appbar}
      >
        {onBack && <Appbar.Action icon="arrow-left" onPress={onBack} />}

        {showTitle ? (
          <Appbar.Content title={title} />
        ) : (
          <View style={styles.content}>{children}</View>
        )}
      </Appbar.Header>

      <TopBarDrawer
        visible={resolvedMenuVisible}
        onDismiss={handleDismiss}
        onLogout={onLogout}
      />
    </>
  );
}
