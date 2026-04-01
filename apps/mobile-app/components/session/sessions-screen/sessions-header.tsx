import React from 'react';
import { TopBar } from '@/components/top-bar/top-bar';
import { StyledSearchbar } from '@/components/layout/styled-searchbar';

export function SessionsHeader({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}) {
  return (
    <>
      <TopBar title="My Practice Sessions" />
      <StyledSearchbar
        placeholder="Search sessions..."
        value={query}
        onChangeText={onChangeQuery}
      />
    </>
  );
}
