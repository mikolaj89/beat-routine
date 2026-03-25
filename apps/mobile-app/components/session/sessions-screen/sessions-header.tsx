import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './sessions-header.style';
import { TopBar } from '@/components/top-bar/top-bar';

export function SessionsHeader({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}) {
  return (
    <>
      <TopBar title="My Practice Sessions" />
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
