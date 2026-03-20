import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './top-bar.style';

export function TopBar({
  title,
  onBack,
  children,
}: {
  title?: string;
  onBack?: () => void;
  children?: ReactNode;
}) {
  const showTitle = Boolean(title) && !children;

  return (
    <Appbar.Header
      mode="small"
      elevated
      statusBarHeight={0}
      style={styles.appbar}
    >
      {onBack && (
        <Appbar.Action
          icon="arrow-left"
          onPress={onBack}
          testID="topbar-back-button"
        />
      )}

      {showTitle ? (
        <Appbar.Content title={title} />
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </Appbar.Header>
  );
}
