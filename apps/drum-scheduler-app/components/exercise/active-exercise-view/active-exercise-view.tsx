import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './active-exercise-view.style';

export default function ActiveExerciseView({
  name,
  bpm,
  timeFormatted,
}: {
  name: string;
  bpm: number;
  timeFormatted: string;
}) {
  return (
    <View style={styles.activeWrap}>
      <Text style={styles.activeTitle}>{name}</Text>
      <Text style={styles.activeMeta}>BPM {bpm}</Text>
      <Text style={styles.activeTimer}>{timeFormatted}</Text>
    </View>
  );
}

