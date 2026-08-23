import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  warm_forest: {
    id: 'warm_forest',
    name: 'Warm Off-White & Muted Forest',
    description: 'Warm off-white background, charcoal dark surface, muted forest green & amber accents',
    previewColors: ['#315c48', '#222a25', '#b77927', '#f3f1eb'],
    colors: {
      primary: '#315c48',           // Muted Forest Green
      primaryHover: '#244737',      // Primary Dark
      primaryLight: '#e2ebe5',      // Soft Forest Tint
      primaryText: '#244737',       // Dark Forest Text
      darkSurface: '#222a25',       // Dark Surface Charcoal
      secondary: '#b77927',         // Amber for charging states
      secondaryHover: '#9a631d',    // Deep Amber
      secondaryLight: '#fdf4e8',    // Amber Tint
      secondaryText: '#784a0d',     // Dark Amber Text
      accent: '#b77927',            // Amber
      accentHover: '#9a631d',       // Amber Dark
      accentLight: '#fdf4e8',       // Light Amber
      red: '#a54d42',               // Red
      redLight: '#faebe9',          // Red Tint
      nature: '#315c48',            // Muted Forest Green
      natureLight: '#e2ebe5',       // Forest Dew
      bgCanvas: '#f3f1eb',          // Background: Warm Off-White
      bgCard: '#fbfaf6',            // Surface: Warm White Card
      bgCardSubtle: '#edeae1',      // Subtle Surface
      borderSubtle: '#d8d4ca',      // Borders: Warm Border
      borderStrong: '#315c48',      // Forest Accent Border
      textMain: '#20231f',          // Text: Charcoal
      textMuted: '#73766f',         // Muted Text
    },
  },
  lush_meadow: {
    id: 'lush_meadow',
    name: 'Lush Meadow & Sunlit Hills',
    description: 'Rolling green hills with wild daisies & crisp white cards',
    previewColors: ['#15803D', '#0284C7', '#EAB308', '#FFFFFF'],
    colors: {
      primary: '#15803D',
      primaryHover: '#166534',
      primaryLight: '#DCFCE7',
      primaryText: '#14532D',
      darkSurface: '#142817',
      secondary: '#0284C7',
      secondaryHover: '#0369A1',
      secondaryLight: '#E0F2FE',
      secondaryText: '#075985',
      accent: '#EAB308',
      accentHover: '#CA8A04',
      accentLight: '#FEF9C3',
      red: '#DC2626',
      redLight: '#FEE2E2',
      nature: '#16A34A',
      natureLight: '#DCFCE7',
      bgCanvas: '#F2FBF4',
      bgCard: '#FFFFFF',
      bgCardSubtle: '#F8FCF9',
      borderSubtle: '#D1EAD7',
      borderStrong: '#86EFAC',
      textMain: '#142817',
      textMuted: '#4B6350',
    },
  },
  golden_canola: {
    id: 'golden_canola',
    name: 'Golden Rapeseed & Azure Sky',
    description: 'Cyclists through vibrant yellow bloom fields under azure summer skies',
    previewColors: ['#D97706', '#0284C7', '#16A34A', '#FFFFFF'],
    colors: {
      primary: '#D97706',
      primaryHover: '#B45309',
      primaryLight: '#FEF3C7',
      primaryText: '#78350F',
      darkSurface: '#1C1E17',
      secondary: '#0284C7',
      secondaryHover: '#0369A1',
      secondaryLight: '#E0F2FE',
      secondaryText: '#075985',
      accent: '#DC2626',
      accentHover: '#B91C1C',
      accentLight: '#FEE2E2',
      red: '#DC2626',
      redLight: '#FEE2E2',
      nature: '#16A34A',
      natureLight: '#DCFCE7',
      bgCanvas: '#F7FCEF',
      bgCard: '#FFFFFF',
      bgCardSubtle: '#FCFDF8',
      borderSubtle: '#E2E8D5',
      borderStrong: '#FDE68A',
      textMain: '#1C1E17',
      textMuted: '#5C6350',
    },
  },
  ghibli_paddy: {
    id: 'ghibli_paddy',
    name: 'Studio Ghibli Countryside',
    description: 'Fresh rice paddies, meandering azure stream & terracotta rooftops',
    previewColors: ['#15803D', '#0284C7', '#FB923C', '#FFFFFF'],
    colors: {
      primary: '#15803D',
      primaryHover: '#166534',
      primaryLight: '#DCFCE7',
      primaryText: '#14532D',
      darkSurface: '#15241C',
      secondary: '#0284C7',
      secondaryHover: '#0369A1',
      secondaryLight: '#E0F2FE',
      secondaryText: '#075985',
      accent: '#FB923C',
      accentHover: '#EA580C',
      accentLight: '#FFEDD5',
      red: '#EA580C',
      redLight: '#FFEDD5',
      nature: '#22C55E',
      natureLight: '#DCFCE7',
      bgCanvas: '#F0FDF9',
      bgCard: '#FFFFFF',
      bgCardSubtle: '#F4FBF7',
      borderSubtle: '#CDEAE0',
      borderStrong: '#86EFAC',
      textMain: '#15241C',
      textMuted: '#4D6657',
    },
  },
  summer_lagoon: {
    id: 'summer_lagoon',
    name: 'Cool Summer Lagoon & Lime',
    description: 'Deep emerald swimming cove with lime leaves & teal reflections',
    previewColors: ['#047857', '#65A30D', '#0284C7', '#FFFFFF'],
    colors: {
      primary: '#047857',
      primaryHover: '#065F46',
      primaryLight: '#D1FAE5',
      primaryText: '#064E3B',
      darkSurface: '#12261E',
      secondary: '#65A30D',
      secondaryHover: '#4D7C0F',
      secondaryLight: '#ECFCCB',
      secondaryText: '#365314',
      accent: '#0284C7',
      accentHover: '#0369A1',
      accentLight: '#E0F2FE',
      red: '#DC2626',
      redLight: '#FEE2E2',
      nature: '#10B981',
      natureLight: '#D1FAE5',
      bgCanvas: '#F3FAF7',
      bgCard: '#FFFFFF',
      bgCardSubtle: '#F5FCF9',
      borderSubtle: '#CCECE0',
      borderStrong: '#6EE7B7',
      textMain: '#12261E',
      textMuted: '#4A695C',
    },
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('ecoryx_color_palette');
    return saved && THEMES[saved] ? saved : 'warm_forest';
  });

  const themeData = THEMES[currentTheme] || THEMES.warm_forest;

  useEffect(() => {
    localStorage.setItem('ecoryx_color_palette', currentTheme);
    const root = document.documentElement;
    const { colors } = themeData;

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-primary-text', colors.primaryText);

    root.style.setProperty('--dark-surface', colors.darkSurface || '#222a25');

    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-secondary-hover', colors.secondaryHover);
    root.style.setProperty('--color-secondary-light', colors.secondaryLight);
    root.style.setProperty('--color-secondary-text', colors.secondaryText);

    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-accent-hover', colors.accentHover);
    root.style.setProperty('--color-accent-light', colors.accentLight);

    root.style.setProperty('--color-red', colors.red || '#a54d42');
    root.style.setProperty('--color-red-light', colors.redLight || '#faebe9');

    root.style.setProperty('--color-nature', colors.nature);
    root.style.setProperty('--color-nature-light', colors.natureLight);

    root.style.setProperty('--bg-canvas', colors.bgCanvas);
    root.style.setProperty('--bg-card', colors.bgCard);
    root.style.setProperty('--bg-card-subtle', colors.bgCardSubtle);
    root.style.setProperty('--border-subtle', colors.borderSubtle);
    root.style.setProperty('--border-strong', colors.borderStrong);
    root.style.setProperty('--text-main', colors.textMain);
    root.style.setProperty('--text-muted', colors.textMuted);
  }, [currentTheme, themeData]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themeData, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
