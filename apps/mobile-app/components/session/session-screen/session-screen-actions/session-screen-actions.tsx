import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './session-screen-actions.style';

export function SessionScreenActions({
  hasExercises,
  onPressStartSession,
  onPressAddExercises,
  isEditMode = false,
  onPressSaveChanges,
  isSavingChanges = false,
  isSaveChangesDisabled = false,
}: {
  hasExercises: boolean;
  onPressStartSession: () => void;
  onPressAddExercises: () => void;
  isEditMode?: boolean;
  onPressSaveChanges?: () => void;
  isSavingChanges?: boolean;
  isSaveChangesDisabled?: boolean;
}) {
  if (isEditMode) {
    return (
      <View style={styles.ctaWrap}>
        <Button
          icon="content-save"
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          labelStyle={styles.ctaButtonLabel}
          mode="contained"
          onPress={onPressSaveChanges}
          loading={isSavingChanges}
          disabled={isSaveChangesDisabled || isSavingChanges}
        >
          Save changes
        </Button>
      </View>
    );
  }

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
        <>
          <View style={styles.noExercisesWrap}>
            <View style={styles.noExercisesContent}>
              <Text variant="headlineMedium" style={styles.noExercisesText}>
                No exercises in this session.
              </Text>
              <Text variant="bodyLarge" style={styles.noExercisesText}>
                Start by adding some exercises! 🚀
              </Text>
            </View>
          </View>
          <View style={styles.ctaWrap}>
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
        </>
      )}
    </>
  );
}
