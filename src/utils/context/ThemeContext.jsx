import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  warm_forest: {
    id: 'warm_forest',
    name: 'Archival Pine & Ochre',
    description: 'Warm archival paper, deep charcoal console, pine green & ochre statutory accents',
    previewColors: ['#284e3a', '#1c231f', '#9c6519', '#f4f1ea'],
    colors: {
      primary: '#284e3a',           // Deep Pine Green
      primaryHover: '#1e3b2c',      // Deep Forest
      primaryLight: '#e3ebe5',      // Forest Tint
      primaryText: '#1a3527',       // Dark Forest Text
      darkSurface: '#1c231f',       // Charcoal Slate
      secondary: '#9c6519',         // Ochre Amber
      secondaryHover: '#7e5011',    // Deep Ochre
      secondaryLight: '#fbf0dc',    // Warm Ochre Tint
      secondaryText: '#6b430b',     // Dark Ochre Text
      accent: '#9c6519',
      accentHover: '#7e5011',
      accentLight: '#fbf0dc',
      red: '#943b32',               // Madder Red
      redLight: '#fae7e5',          // Madder Tint
      nature: '#284e3a',
      natureLight: '#e3ebe5',
      bgCanvas: '#f4f1ea',          // Archival Warm Canvas
      bgCard: '#faf9f5',            // Archival Surface Paper
      bgCardSubtle: '#eae6dc',      // Subtle Document Grey/Tan
      borderSubtle: '#d5cfc2',      // Hairline Border
      borderStrong: '#284e3a',      // Forest Border
      textMain: '#1a1d1a',          // Carbon Charcoal
      textMuted: '#5e625a',         // Regulatory Annotation Muted
    },
  },
  alpine_reserve: {
    id: 'alpine_reserve',
    name: 'Alpine Reserve & Ochre',
    description: 'Crisp mountain ledger paper, cedar green and earthy clay highlights',
    previewColors: ['#2e5339', '#19231c', '#985e26', '#f5f3ec'],
    colors: {
      primary: '#2e5339',
      primaryHover: '#213f2a',
      primaryLight: '#e3ece5',
      primaryText: '#1b3823',
      darkSurface: '#19231c',
      secondary: '#985e26',
      secondaryHover: '#7b4819',
      secondaryLight: '#faefdf',
      secondaryText: '#663b11',
      accent: '#985e26',
      accentHover: '#7b4819',
      accentLight: '#faefdf',
      red: '#963a2f',
      redLight: '#fae6e4',
      nature: '#2e5339',
      natureLight: '#e3ece5',
      bgCanvas: '#f5f3ec',
      bgCard: '#faf8f2',
      bgCardSubtle: '#ebe7de',
      borderSubtle: '#d7d1c6',
      borderStrong: '#2e5339',
      textMain: '#1b1e1b',
      textMuted: '#60645c',
    },
  },
  wetland_basin: {
    id: 'wetland_basin',
    name: 'Wetland Basin & Riverbed',
    description: 'Estuarine wetland register, deep river charcoal, reed green and rust flags',
    previewColors: ['#2d5045', '#1b2421', '#9e6224', '#f3f1e9'],
    colors: {
      primary: '#2d5045',
      primaryHover: '#1f3b33',
      primaryLight: '#e2ebe8',
      primaryText: '#18362d',
      darkSurface: '#1b2421',
      secondary: '#9e6224',
      secondaryHover: '#7f4b16',
      secondaryLight: '#faefe0',
      secondaryText: '#683d10',
      accent: '#9e6224',
      accentHover: '#7f4b16',
      accentLight: '#faefe0',
      red: '#953c33',
      redLight: '#fae7e5',
      nature: '#2d5045',
      natureLight: '#e2ebe8',
      bgCanvas: '#f3f1e9',
      bgCard: '#faf9f4',
      bgCardSubtle: '#e9e6dc',
      borderSubtle: '#d4cec3',
      borderStrong: '#2d5045',
      textMain: '#191d1a',
      textMuted: '#5d625b',
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
