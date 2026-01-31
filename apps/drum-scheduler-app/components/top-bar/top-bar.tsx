import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './top-bar.style';
import { theme } from '../../utils/theme';

export function TopBar({
  title,
  onBack,
  onMenu,
  children,
}: {
  title?: string;
  onBack?: () => void;
  onMenu?: () => void;
  children?: ReactNode;
}) {
  const showTitle = Boolean(title) && !children;
  const showMenu = !onBack && Boolean(onMenu);
  return (
    <View style={styles.topBar}>
      {onBack ? (
        <Pressable style={styles.iconBtn} onPress={onBack}>
          <Icon name="arrow-back" size={24} color={theme.colors.icon} />
        </Pressable>
      ) : showMenu ? (
        <Pressable style={[styles.iconBtn, styles.menuButton]} onPress={onMenu}>
          <Icon name="menu" size={24} color={theme.colors.icon} />
        </Pressable>
      ) : null}

      <View style={styles.content}>
        {children}
        {showTitle ? <Text style={styles.topBarTitle}>{title}</Text> : null}
      </View>

      {showTitle && (onBack || showMenu) ? (
        <View style={styles.iconBtn} />
      ) : null}
    </View>
  );
}
