import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { TopBar } from './top-bar';

function renderTopBar() {
  return render(
    <PaperProvider>
      <TopBar title="Sessions" />
    </PaperProvider>,
  );
}

describe('TopBar drawer', () => {
  it('toggles drawer on when menu button is clicked', () => {
    const { getByTestId, getByText, queryByText } = renderTopBar();

    expect(queryByText('Schedule')).toBeNull();
    fireEvent.press(getByTestId('topbar-menu-button'));

    expect(getByText('Schedule')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('toggles drawer off when backdrop is clicked', async () => {
    const { getByTestId, getByText, queryByText } = renderTopBar();

    fireEvent.press(getByTestId('topbar-menu-button'));
    expect(getByText('Schedule')).toBeTruthy();

    fireEvent.press(getByTestId('topbar-drawer-modal-backdrop'));
    await waitFor(() => {
      expect(queryByText('Schedule')).toBeNull();
    });
  });
});
