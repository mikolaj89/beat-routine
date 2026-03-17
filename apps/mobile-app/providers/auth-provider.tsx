import { createContext, useContext, type PropsWithChildren } from 'react';
import { API_BASE_URL } from '../config/env';
import { useMobileAuthSession } from '../hooks/use-mobile-auth-session';

type AuthContextValue = ReturnType<typeof useMobileAuthSession>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const value = useMobileAuthSession(API_BASE_URL);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
