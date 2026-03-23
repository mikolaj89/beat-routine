import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { TopBar } from './top-bar';

function renderTopBar(ui: React.ReactElement) {
  return render(
    <PaperProvider>
      {ui}
    </PaperProvider>,
  );
}

describe('TopBar', () => {
  it('renders the title', () => {
    const { getByText } = renderTopBar(<TopBar title="Sessions" />);

    expect(getByText('Sessions')).toBeTruthy();
  });

  it('calls onBack when the back button is pressed', () => {
    const onBack = jest.fn();
    const { getByTestId } = renderTopBar(
      <TopBar title="Sessions" onBack={onBack} />,
    );

    fireEvent.press(getByTestId('topbar-back-button'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders children instead of the title when children are provided', () => {
    const { getByText, queryByText } = renderTopBar(
      <TopBar title="Sessions">
        <Text>Custom header</Text>
      </TopBar>,
    );

    expect(getByText('Custom header')).toBeTruthy();
    expect(queryByText('Sessions')).toBeNull();
  });

  it('calls onEdit and onDelete when the action buttons are pressed', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const { getByTestId } = renderTopBar(
      <TopBar
        title="Session plan"
        onBack={() => {}}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.press(getByTestId('topbar-edit-button'));
    fireEvent.press(getByTestId('topbar-delete-button'));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
