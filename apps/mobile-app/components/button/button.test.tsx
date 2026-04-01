import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { Button } from './button';

function renderButton(ui: React.ReactElement) {
  return render(
    <PaperProvider>
      {ui}
    </PaperProvider>,
  );
}

describe('Button', () => {
  it('renders the label and calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = renderButton(
      <Button type="Primary" label="Create Session" onPress={onPress} />,
    );

    fireEvent.press(getByText('Create Session'));

    expect(getByText('Create Session')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('supports the explicit filled mode without changing current behavior', () => {
    const { getByText } = renderButton(
      <Button type="Primary" mode="filled" label="Start Session" onPress={() => {}} />,
    );

    expect(getByText('Start Session')).toBeTruthy();
  });

  it('renders with an optional icon and loading state', () => {
    const { getByText } = renderButton(
      <Button
        type="Primary"
        label="Save changes"
        icon="content-save"
        loading
        disabled
      />,
    );

    expect(getByText('Save changes')).toBeTruthy();
  });
});
