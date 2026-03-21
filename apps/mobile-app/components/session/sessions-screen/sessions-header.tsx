import React from 'react';
import { View } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { styles } from './sessions-header.style';

export function SessionsHeader({
  query,
  onChangeQuery,
  onPressCreateSession,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
  onPressCreateSession?: () => void;
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

      <View style={styles.actionsWrap}>
        <Button
          mode="contained"
          icon="plus"
          onPress={onPressCreateSession}
          disabled={!onPressCreateSession}
        >
          New Session
        </Button>
      </View>
    </>
  );
}
