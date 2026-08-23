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
        fintech: {
          blue: '#2563EB',        // FintechX Electric Royal Blue
          blueHover: '#1D4ED8',   // Deep Blue Hover
          blueLight: '#3B82F6',   // Bright Sky AI Blue
          blueSoft: '#E2F5FF',    // Pill tag soft icy blue
          blueMuted: '#EFF6FF',   // Subtle card blue tint
          dark: '#0F172A',        // Deep Midnight Onyx
          darker: '#0B0F19',      // Deep Obsidian
          slate: '#1E293B',       // Refined Slate
          card: '#FFFFFF',        // Crisp Solid White
          cardBg: '#F8FAFC',      // Light Slate Canvas Background
          border: '#E2E8F0',      // Crisp Border Gray
          borderMuted: '#DDE5ED', // Subtle Gray Border
          emerald: '#10B981',     // High-Trust Emerald Accent
          emeraldSoft: '#ECFDF5', // Soft Mint Tag
          amber: '#F59E0B',       // Warning Amber
          crimson: '#EF4444',     // Friction Alert Red
        },
        nature: {
          deep: '#0F172A',        // FintechX Midnight Slate
          pine: '#1E293B',        // FintechX Dark Slate
          moss: '#1E3A8A',        // FintechX Deep Blue
          leaf: '#2563EB',        // FintechX Electric Blue (Primary)
          sage: '#10B981',        // FintechX Emerald Green (Success)
          mint: '#60A5FA',        // FintechX Light Blue Accent
          sprout: '#38BDF8',      // FintechX Cyan Accent
          lightBg: '#F8FAFC',     // FintechX Clean Light Slate Canvas
          cardBg: '#FFFFFF',      // Crisp White Card
          border: '#E2E8F0',      // Clean Fintech Slate Border
          borderDark: '#1E293B'   // Deep Dark Border
        },
        infra: {
          slate: '#0F172A',       // Onyx Slate
          steel: '#334155',       // Steel Charcoal
          clay: '#EA580C',        // Vibrant Coral / Clay
          clayHover: '#C2410C',   // Darker Clay
          sand: '#FDE68A',        // Soft Sand
          concrete: '#E2E8F0',    // Light Border
          accent: '#2563EB'       // Electric Blue Accent
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        display: ['"Plus Jakarta Sans"', '"Inter Display"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'fintech-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'fintech-md': '0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
        'fintech-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)',
        'fintech-glow': '0 0 25px rgba(37, 99, 235, 0.18)',
      }
    },
  },
  plugins: [],
}

