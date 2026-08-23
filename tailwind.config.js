/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f3f1eb',
        surface: '#fbfaf6',
        surfaceDark: '#222a25',
        primary: {
          DEFAULT: '#315c48',
          dark: '#244737',
          light: '#e2ebe5',
        },
        amber: {
          DEFAULT: '#b77927',
          dark: '#9a631d',
          light: '#fdf4e8',
        },
        red: {
          DEFAULT: '#a54d42',
          light: '#faebe9',
        },
        charcoal: '#20231f',
        muted: '#73766f',
        border: '#d8d4ca',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(32, 35, 31, 0.04)',
        'sm': '0 1px 3px rgba(32, 35, 31, 0.06), 0 1px 2px rgba(32, 35, 31, 0.04)',
        'md': '0 4px 6px -1px rgba(32, 35, 31, 0.06), 0 2px 4px -1px rgba(32, 35, 31, 0.03)',
      }
    },
  },
  plugins: [],
}
