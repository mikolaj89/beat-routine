import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import type { Exercise } from '@drum-scheduler/contracts';
import { SessionExercisesList } from './session-exercises-list';

jest.mock('react-native-draggable-flatlist', () => {
  const React = require('react');
  const { Pressable, View } = require('react-native');

  const MockDraggableFlatList = function ({
    data,
    renderItem,
    onDragEnd,
  }: {
    data: Exercise[];
    renderItem: (params: {
      item: Exercise;
      drag: () => void;
      isActive: boolean;
      getIndex: () => number;
    }) => React.ReactNode;
    onDragEnd: (params: { data: Exercise[] }) => void;
  }) {
    return (
      <View>
        {data.map((item, index) => (
          <View key={item.id}>
            {renderItem({
              item,
              drag: jest.fn(),
              isActive: false,
              getIndex: () => index,
            })}
          </View>
        ))}
        <Pressable
          testID="draggable-list-trigger-reorder"
          onPress={() =>
            onDragEnd({
              data: [...data].reverse(),
            })
          }
        />
      </View>
    );
  };

  return {
    __esModule: true,
    default: MockDraggableFlatList,
  };
});

const exerciseA: Exercise = {
  id: 1,
  name: 'First Exercise',
  categoryId: null,
  description: null,
  durationMinutes: 5,
  bpm: 120,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

const exerciseB: Exercise = {
  id: 2,
  name: 'Second Exercise',
  categoryId: null,
  description: null,
  durationMinutes: 10,
  bpm: 100,
  mp3Url: null,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('SessionExercisesList', () => {
  it('renders drag handles and reorders exercises on drag end', () => {
    const { getAllByTestId, getByTestId, toJSON } = render(
      <SessionExercisesList
        exercises={[exerciseA, exerciseB]}
        isLoading={false}
        hasError={false}
        isDraggable={true}
      />,
    );

    expect(getAllByTestId('exercise-card-drag-handle')).toHaveLength(2);

    const initialTree = JSON.stringify(toJSON());
    expect(initialTree.indexOf('First Exercise')).toBeLessThan(
      initialTree.indexOf('Second Exercise'),
    );

    fireEvent.press(getByTestId('draggable-list-trigger-reorder'));

    const reorderedTree = JSON.stringify(toJSON());
    expect(reorderedTree.indexOf('Second Exercise')).toBeLessThan(
      reorderedTree.indexOf('First Exercise'),
    );
  });

  it('does not render drag handles when isDraggable is false', () => {
    const { queryByTestId, getByText } = render(
      <SessionExercisesList
        exercises={[exerciseA, exerciseB]}
        isLoading={false}
        hasError={false}
        isDraggable={false}
      />,
    );

    expect(getByText('First Exercise')).toBeTruthy();
    expect(getByText('Second Exercise')).toBeTruthy();
    expect(queryByTestId('exercise-card-drag-handle')).toBeNull();
    expect(queryByTestId('draggable-list-trigger-reorder')).toBeNull();
  });
});
