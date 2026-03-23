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
    <>
      {hasExercises ? (
        <View style={styles.ctaWrap}>
          <Button
            style={styles.ctaButton}
            contentStyle={styles.ctaButtonContent}
            labelStyle={styles.ctaButtonLabel}
            mode="contained"
            onPress={onPressStartSession}
          >
            Start Session
          </Button>
        </View>
      ) : (
        <View style={styles.noExercisesWrap}>
          <View style={styles.noExercisesContent}>
            <Text variant="headlineMedium" style={styles.noExercisesText}>No exercises in this session. </Text>
            <Text variant="bodyLarge" style={styles.noExercisesText}>
              {' '}
              Start by adding some exercises! 🚀{' '}
            </Text>
            <Button
              style={styles.ctaButton}
              contentStyle={styles.ctaButtonContent}
              labelStyle={styles.ctaButtonLabel}
              mode="contained"
              onPress={onPressAddExercises}
            >
              Add exercises
            </Button>
          </View>
        </View>
      )}
    </>
  );
}
