import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './styled-searchbar.style';

export function StyledSearchbar({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.searchWrap}>
      <Searchbar
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />
    </View>
  );
}
