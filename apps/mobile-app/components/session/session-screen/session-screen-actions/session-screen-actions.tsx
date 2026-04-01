import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from '../../../button/button';
import { StickyFooterBar } from '../../../layout/sticky-footer-bar';
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
      <StickyFooterBar>
        <Button
         label='Save changes'
         type="Primary"
          icon="content-save"
          style={styles.ctaButton}
          contentStyle={styles.ctaButtonContent}
          labelStyle={styles.ctaButtonLabel}
          
          onPress={onPressSaveChanges}
          loading={isSavingChanges}
          disabled={isSaveChangesDisabled || isSavingChanges}
        />
         
      </StickyFooterBar>
    );
  }

  return (
    <>
      {hasExercises ? (
        <StickyFooterBar>
          <Button
            label='Start Session'
            type="Primary"
            style={styles.ctaButton}
            contentStyle={styles.ctaButtonContent}
            labelStyle={styles.ctaButtonLabel}
            onPress={onPressStartSession}
          />
        </StickyFooterBar>
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
          <StickyFooterBar>
            <Button
              label='Add exercises'
              type="Primary"
              style={styles.ctaButton}
              contentStyle={styles.ctaButtonContent}
              labelStyle={styles.ctaButtonLabel}
              onPress={onPressAddExercises}
              />
          </StickyFooterBar>
        </>
      )}
    </>
  );
}
