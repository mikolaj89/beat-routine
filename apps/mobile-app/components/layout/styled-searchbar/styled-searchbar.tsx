import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { styles } from './styled-searchbar.style';
import { theme } from '../../../utils/theme';

export function StyledSearchbar({
  placeholder,
  value,
  onChangeText,
  isDisabled = false,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isDisabled?: boolean;
}) {
  return (
    <View style={styles.searchWrap}>
      <View style={styles.searchbarShadowWrap}>
        <Searchbar
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          iconColor={theme.colors.searchBarPlaceholder}
          placeholderTextColor={theme.colors.searchBarPlaceholder}
          inputStyle={styles.searchInput}
          style={styles.searchbar}
          testID="styled-searchbar"
        />
      </View>
    </View>
  );
}
