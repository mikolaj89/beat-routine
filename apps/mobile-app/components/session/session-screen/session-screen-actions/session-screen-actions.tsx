import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { styles } from './session-screen-actions.style';

export function SessionScreenActions({
  hasExercises,
  onPressStartSession,
  onPressAddExercises,
}: {
  hasExercises: boolean;
  onPressStartSession: () => void;
  onPressAddExercises: () => void;
}) {
  return (
    <View style={styles.ctaWrap}>
      {hasExercises ? (
        <Button
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          labelStyle={styles.ctaButtonLabel}
          mode="contained"
          onPress={onPressStartSession}
        >
          Start Session
        </Button>
      ) : (
        <>
        {/* rocket icon */}
        <Text style={styles.ctaButtonLabel}>No exercises in this session. Start by adding some! 🚀 </Text>
        <Button
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          labelStyle={styles.ctaButtonLabel}
          mode="contained"
          onPress={onPressAddExercises}
        >
          Add exercises
        </Button>
      </>)}
    </View>
  );
}
