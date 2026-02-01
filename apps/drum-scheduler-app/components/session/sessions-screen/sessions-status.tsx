import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { styles } from './sessions-status.style';

export function SessionsStatus({
 
  isLoading,
}: {
  message: string | null;
  isLoading: boolean;
}) {
 

  return (
    <View style={styles.statusWrap}>
      {isLoading ? <ActivityIndicator size="small" /> : null}
   
    </View>
  );
}
