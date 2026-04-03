import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './top-bar.style';

export function TopBar({
  title,
  onBack,
  onEdit,
  onDelete,
  backIcon = 'arrow-left',
  children,
}: {
  title?: string;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  backIcon?: string;
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
          icon={backIcon}
          onPress={onBack}
          testID="topbar-back-button"
        />
      )}

      {showTitle ? (
        <Appbar.Content title={title ?? ''} titleStyle={styles.titleStyle} />
      ) : (
        <View style={styles.content}>{children}</View>
      )}
      {onEdit && (
        <Appbar.Action
          icon="pencil"
          onPress={onEdit}
          testID="topbar-edit-button"
          style={styles.rightAction}
          size={24}
        />
      )}
      {onDelete && (
        <Appbar.Action
          icon="delete"
          onPress={onDelete}
          testID="topbar-delete-button"
          style={styles.rightAction}
          size={24}
        />
      )}
    </Appbar.Header>
  );
}
