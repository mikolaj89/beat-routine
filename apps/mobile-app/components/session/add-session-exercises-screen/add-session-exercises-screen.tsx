import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Button } from '@/components/button';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { StickyFooterBar } from '../../layout/sticky-footer-bar';
import { StyledSearchbar } from '../../layout/styled-searchbar';
import { TopBar } from '../../top-bar/top-bar';
import { AddSessionExercisesList } from '../add-session-exercises-list';
import { useAddSessionExercisesScreen } from './use-add-session-exercises-screen';
import { styles } from './add-session-exercises-screen.style';

export default function AddSessionExercisesScreen({
  baseUrl,
  sessionId,
  accessToken,
  onBack,
}: {
  baseUrl: string;
  sessionId: number;
  accessToken: string | null;
  onBack: () => void;
}) {
  const {
    searchQuery,
    setSearchQuery,
    exercises,
    listStatus,
    emptyStatus,
    errorMessage,
    alreadyInSessionIds,
    selectedIds,
    toggleSelection,
    onAddToSession,
    isAddPending,
    addButtonDisabled,
    addSessionErrorMessage,
    resetAddSessionError,
  } = useAddSessionExercisesScreen({
    baseUrl,
    sessionId,
    accessToken,
    onBack,
  });

  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title="Add Exercises" onBack={onBack} />

        <StyledSearchbar
          placeholder="Search exercises…"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <AddSessionExercisesList
          exercises={exercises}
          listStatus={listStatus}
          emptyStatus={emptyStatus}
          errorMessage={errorMessage}
          alreadyInSessionIds={alreadyInSessionIds}
          selectedIds={selectedIds}
          onToggleSelection={toggleSelection}
        />

        <StickyFooterBar>
          <Button
            icon="check"
            type="Primary"
            label={`Add selected (${selectedIds.length})`}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            disabled={addButtonDisabled}
            loading={isAddPending}
            onPress={() => void onAddToSession()}
          />
        </StickyFooterBar>

        <Snackbar
          visible={Boolean(addSessionErrorMessage)}
          onDismiss={resetAddSessionError}
          duration={5000}
          action={{
            label: 'Dismiss',
            onPress: resetAddSessionError,
          }}
        >
          {addSessionErrorMessage ?? ''}
        </Snackbar>
      </View>
    </ScreenContainer>
  );
}
