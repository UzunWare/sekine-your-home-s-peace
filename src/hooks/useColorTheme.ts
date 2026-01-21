import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getThemeById, type ColorThemeId } from '@/data/colorThemes';

/**
 * Hook to apply the selected color theme's CSS variables to the document root.
 * Should be called once at the app level to ensure theme is applied globally.
 */
export function useColorTheme() {
  const { settings } = useApp();
  const themeId = settings.display.colorTheme ?? 'emerald-gold';

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);
}

/**
 * Apply a color theme by setting CSS variables on the document root.
 */
function applyTheme(themeId: ColorThemeId) {
  const theme = getThemeById(themeId);
  const root = document.documentElement;

  if (!theme) {
    console.warn(`Theme "${themeId}" not found, using default`);
    return;
  }

  // If emerald-gold (default), remove any custom properties to use CSS defaults
  if (themeId === 'emerald-gold') {
    // Reset to defaults by removing custom properties
    const varsToReset = [
      '--background', '--foreground', '--card', '--card-foreground',
      '--popover', '--popover-foreground', '--primary', '--primary-foreground',
      '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
      '--accent', '--accent-foreground', '--border', '--input', '--ring',
      '--gold', '--gold-soft', '--gold-glow', '--emerald', '--emerald-light',
      '--emerald-dark', '--emerald-glow', '--sage', '--sage-soft',
      '--midnight', '--midnight-light', '--cream', '--cream-muted',
      '--sidebar-background', '--sidebar-foreground', '--sidebar-primary',
      '--sidebar-primary-foreground', '--sidebar-accent', '--sidebar-accent-foreground',
      '--sidebar-border', '--sidebar-ring',
    ];
    
    varsToReset.forEach((varName) => {
      root.style.removeProperty(varName);
    });
    return;
  }

  // Apply custom theme variables
  Object.entries(theme.cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}
