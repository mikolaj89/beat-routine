import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { TopBar } from '../../top-bar/top-bar';
import { useAuth } from '../../../providers/auth-provider';
import { styles } from './sessions-header.style';

export function SessionsHeader({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}) {
  const { logout } = useAuth();

  return (
    <>
      <TopBar title="Sessions" onLogout={logout} />

      <View style={styles.searchWrap}>
        <Searchbar
          placeholder="Search sessions..."
          value={query}
          onChangeText={onChangeQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
      </View>
    </>
  );
}
