import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './sticky-footer-bar.style';

export function StickyFooterBar({ children }: { children: ReactNode }) {
  return <View style={styles.footer}>{children}</View>;
}
