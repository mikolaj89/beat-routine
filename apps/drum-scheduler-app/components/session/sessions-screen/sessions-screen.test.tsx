import React from 'react';
import { render } from '@testing-library/react-native';
import SessionsScreen from './sessions-screen';
import { useSessionsQuery } from '@drum-scheduler/sdk';

jest.mock('@drum-scheduler/sdk', () => ({
  useSessionsQuery: jest.fn(),
}));

const mockUseSessionsQuery = useSessionsQuery as jest.MockedFunction<
  typeof useSessionsQuery
>;

describe('SessionsScreen', () => {
  it('renders empty state and CTA', () => {
    mockUseSessionsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    const { getByText } = render(<SessionsScreen onOpenSession={() => {}} />);
    expect(getByText('No sessions found.')).toBeTruthy();
  });
});
