// Color Theme Registry for Sekine TV

export type ColorThemeId = 'emerald-gold' | 'midnight-azure' | 'desert-sand';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  description: string;
  preview: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  cssVariables: Record<string, string>;
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'emerald-gold',
    name: 'Emerald & Gold',
    description: 'Rich emerald with antique gold accents',
    preview: {
      background: 'hsl(160 30% 4%)',
      primary: 'hsl(43 60% 45%)',
      secondary: 'hsl(160 55% 22%)',
      accent: 'hsl(150 35% 40%)',
    },
    cssVariables: {
      // This is the default theme, so no overrides needed
    },
  },
  {
    id: 'midnight-azure',
    name: 'Midnight & Azure',
    description: 'Deep navy with calming azure highlights',
    preview: {
      background: 'hsl(220 35% 5%)',
      primary: 'hsl(210 60% 55%)',
      secondary: 'hsl(215 45% 25%)',
      accent: 'hsl(200 50% 45%)',
    },
    cssVariables: {
      '--background': '220 35% 5%',
      '--foreground': '210 20% 96%',
      '--card': '220 30% 10%',
      '--card-foreground': '210 20% 96%',
      '--popover': '220 30% 8%',
      '--popover-foreground': '210 20% 96%',
      '--primary': '210 60% 55%',
      '--primary-foreground': '220 35% 5%',
      '--secondary': '215 45% 25%',
      '--secondary-foreground': '210 20% 96%',
      '--muted': '220 25% 14%',
      '--muted-foreground': '215 20% 50%',
      '--accent': '200 50% 45%',
      '--accent-foreground': '210 20% 96%',
      '--border': '220 25% 18%',
      '--input': '220 25% 18%',
      '--ring': '210 60% 55%',
      '--gold': '210 60% 55%',
      '--gold-soft': '210 50% 65%',
      '--gold-glow': '210 70% 60%',
      '--emerald': '215 45% 25%',
      '--emerald-light': '215 40% 35%',
      '--emerald-dark': '220 50% 18%',
      '--emerald-glow': '210 50% 40%',
      '--sage': '200 35% 60%',
      '--sage-soft': '200 30% 70%',
      '--midnight': '220 35% 5%',
      '--midnight-light': '220 30% 12%',
      '--cream': '210 20% 96%',
      '--cream-muted': '210 15% 75%',
      '--sidebar-background': '220 30% 8%',
      '--sidebar-foreground': '210 20% 96%',
      '--sidebar-primary': '210 60% 55%',
      '--sidebar-primary-foreground': '220 35% 5%',
      '--sidebar-accent': '220 25% 14%',
      '--sidebar-accent-foreground': '210 20% 96%',
      '--sidebar-border': '220 25% 18%',
      '--sidebar-ring': '210 60% 55%',
    },
  },
  {
    id: 'desert-sand',
    name: 'Desert Sand',
    description: 'Warm terracotta with earthy tones',
    preview: {
      background: 'hsl(25 25% 6%)',
      primary: 'hsl(18 55% 50%)',
      secondary: 'hsl(35 40% 30%)',
      accent: 'hsl(30 50% 45%)',
    },
    cssVariables: {
      '--background': '25 25% 6%',
      '--foreground': '40 25% 95%',
      '--card': '25 20% 10%',
      '--card-foreground': '40 25% 95%',
      '--popover': '25 22% 8%',
      '--popover-foreground': '40 25% 95%',
      '--primary': '18 55% 50%',
      '--primary-foreground': '40 25% 95%',
      '--secondary': '35 40% 30%',
      '--secondary-foreground': '40 25% 95%',
      '--muted': '25 18% 14%',
      '--muted-foreground': '30 15% 50%',
      '--accent': '30 50% 45%',
      '--accent-foreground': '40 25% 95%',
      '--border': '25 18% 18%',
      '--input': '25 18% 18%',
      '--ring': '18 55% 50%',
      '--gold': '18 55% 50%',
      '--gold-soft': '25 45% 58%',
      '--gold-glow': '20 60% 55%',
      '--emerald': '35 40% 30%',
      '--emerald-light': '35 35% 40%',
      '--emerald-dark': '30 45% 22%',
      '--emerald-glow': '30 45% 38%',
      '--sage': '35 30% 55%',
      '--sage-soft': '35 25% 65%',
      '--midnight': '25 25% 6%',
      '--midnight-light': '25 20% 12%',
      '--cream': '40 25% 95%',
      '--cream-muted': '35 18% 72%',
      '--sidebar-background': '25 22% 8%',
      '--sidebar-foreground': '40 25% 95%',
      '--sidebar-primary': '18 55% 50%',
      '--sidebar-primary-foreground': '40 25% 95%',
      '--sidebar-accent': '25 18% 14%',
      '--sidebar-accent-foreground': '40 25% 95%',
      '--sidebar-border': '25 18% 18%',
      '--sidebar-ring': '18 55% 50%',
    },
  },
];

export function getThemeById(id: ColorThemeId): ColorTheme | undefined {
  return colorThemes.find((theme) => theme.id === id);
}
