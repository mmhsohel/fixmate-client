import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        ink: {
          700: '#1e3a4c',
          800: '#12293a',
          900: '#0b1b2b',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,43,.05), 0 8px 24px -12px rgba(11,27,43,.18)',
        'card-dark': '0 1px 2px rgba(0,0,0,.35), 0 10px 28px -12px rgba(0,0,0,.55)',
      },
      keyframes: {
        pop: {
          '0%': { opacity: '0', transform: 'scale(.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        pop: 'pop .15s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;