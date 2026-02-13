import React from 'react';
import { render } from '@testing-library/react-native';
import SessionScreen from './session-screen';
import { useSessionQuery } from '@drum-scheduler/sdk';
import type { Exercise } from '@drum-scheduler/contracts';

jest.mock('@drum-scheduler/sdk', () => ({
  useSessionQuery: jest.fn(),
}));

const mockUseSessionQuery = useSessionQuery as jest.MockedFunction<
  typeof useSessionQuery
>;

const exerciseFixture: Exercise = {
  id: 1,
  name: 'Paradiddle',
  categoryId: null,
  description: 'RLRR LRLL',
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('SessionScreen', () => {
  it('renders session details and empty state', () => {
    mockUseSessionQuery.mockReturnValue({
      data: {
        name: 'Session 2026',
        totalDuration: 0,
        exercises: [],
      },
      isLoading: false,
      error: null,
    } as any);

    const { getByText } = render(
      <SessionScreen
        baseUrl="http://example.test"
        sessionId={1}
        onBack={() => {}}
        onStart={() => {}}
      />
    );

    expect(getByText('Session 2026')).toBeTruthy();
    expect(getByText('Total duration: 0 min')).toBeTruthy();
    expect(getByText('No exercises in this session.')).toBeTruthy();
  });

  it('renders exercise list when present', () => {
    mockUseSessionQuery.mockReturnValue({
      data: {
        name: 'Session 2026',
        totalDuration: 5,
        exercises: [exerciseFixture],
      },
      isLoading: false,
      error: null,
    } as any);

    const { getByText } = render(
      <SessionScreen
        baseUrl="http://example.test"
        sessionId={1}
        onBack={() => {}}
        onStart={() => {}}
      />
    );

    expect(getByText('Paradiddle')).toBeTruthy();
    expect(getByText('5 min')).toBeTruthy();
  });
});
