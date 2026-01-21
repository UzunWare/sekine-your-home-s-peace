import { ReactNode } from 'react';
import { useColorTheme } from '@/hooks/useColorTheme';

interface ColorThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider component that applies the selected color theme.
 * Must be used within AppProvider to access settings.
 */
export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
  useColorTheme();
  return <>{children}</>;
}
