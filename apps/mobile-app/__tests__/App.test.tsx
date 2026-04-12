/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');

  return {
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});

jest.mock('../utils/crashlytics-network-logging', () => ({
  installCrashlyticsNetworkFailureLogging: jest.fn(),
}));

import App from '../App';
import { installCrashlyticsNetworkFailureLogging } from '../utils/crashlytics-network-logging';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('installs crashlytics network logging on startup', () => {
  expect(installCrashlyticsNetworkFailureLogging).toHaveBeenCalledTimes(1);
});
