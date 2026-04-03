import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './search-bar.style';
import { theme } from '../../utils/theme';

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  isDisabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
}) {
  return (
    <View style={styles.searchWrap}>
      <Icon name="search" size={22} color={theme.colors.searchBarPlaceholder} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.searchBarPlaceholder}
        editable={!isDisabled}
        style={styles.searchInput}
      />
    </View>
  );
}
