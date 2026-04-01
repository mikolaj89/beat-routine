import React from 'react';
import { theme } from '../../utils/theme';
import { LoadingSpinner } from '../layout/loading-spinner';

export function SplashScreen() {
  return <LoadingSpinner style={{ backgroundColor: theme.colors.bg }} />;
}
