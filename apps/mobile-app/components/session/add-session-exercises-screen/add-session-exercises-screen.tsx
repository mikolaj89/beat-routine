import React from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '../../layout/screen-container/screen-container';
import { TopBar } from '../../top-bar/top-bar';
import { styles } from './add-session-exercises-screen.style';

export default function AddSessionExercisesScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <ScreenContainer>
      <View style={styles.screen}>
        <TopBar title="Add Exercises" onBack={onBack} />
      </View>
    </ScreenContainer>
  );
}
