import React from 'react';
import { View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { styles } from './sessions-header.style';

export function SessionsHeader({
  query,
  onChangeQuery,
  onMenu,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
  onMenu?: () => void;
}) {
  return (
    <>
      <Appbar.Header mode="small" elevated style={styles.appbar}>
        <Appbar.Action icon="menu" onPress={onMenu ?? (() => {})} />
        <Appbar.Content title="Sessions" />
      </Appbar.Header>

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
