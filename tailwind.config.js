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
        sans: ['"Google Sans"', '"Mulish"', '"Merriweather Sans"', 'sans-serif'],
        serif: ['"Google Sans"', '"Mulish"', '"Merriweather Sans"', 'sans-serif'],
        mono: ['"Google Sans"', '"Mulish"', '"Merriweather Sans"', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
        'fluid-sm': 'clamp(0.875rem, 0.82rem + 0.25vw, 0.95rem)',
        'fluid-base': 'clamp(0.95rem, 0.9rem + 0.3vw, 1.0625rem)',
        'fluid-lg': 'clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.15rem + 0.5vw, 1.45rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.35rem + 0.8vw, 1.85rem)',
        'fluid-3xl': 'clamp(1.85rem, 1.6rem + 1.2vw, 2.35rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.6vw, 3rem)',
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
        '2xl': '8px',
        'full': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px rgba(28, 35, 31, 0.04)',
        'sm': '0 1px 3px rgba(28, 35, 31, 0.05)',
        'neumorphic': 'inset 1px 1px 1px rgba(255, 255, 255, 0.70), inset -1px -1px 1px rgba(152, 161, 174, 0.35), 6px 6px 14px rgba(152, 161, 174, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.95)',
        'neumorphic-pressed': 'inset 4px 4px 8px rgba(152, 161, 174, 0.75), inset -4px -4px 8px rgba(255, 255, 255, 0.95)',
        'glass': '0 19px 54px -14px rgba(0, 0, 0, 0.305), 0 1px 2px rgba(0, 0, 0, 0.152), inset 0 0 8px rgba(255, 255, 255, 0.115), inset 0 4px 8px -4px rgba(0, 0, 0, 0.060), inset 0 -1px 1px rgba(255, 255, 255, 0.180), inset 0 1px 1px rgba(255, 255, 255, 0.820), inset 0 0 0 1px rgba(255, 255, 255, 0.480)',
      },
      colors: {
        'neumorphic-bg': '#dde3ec',
        'glass-tint': 'rgb(255 255 255 / <alpha-value>)',
      },
      backgroundImage: {
        'neumorphic': 'linear-gradient(145deg, #e2e8f1 0%, #d8dee7 100%)',
        'glass': 'radial-gradient(ellipse 130% 90% at 50% 0%, rgba(255, 255, 255, 0.140) 0%, rgba(255, 255, 255, 0.060) 45%, rgba(255, 255, 255, 0.010) 100%)',
      },
    },
  },
  plugins: [],
}
