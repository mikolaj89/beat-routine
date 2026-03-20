import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './sessions-header.style';

export function SessionsHeader({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}) {
  return (
    <>
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
