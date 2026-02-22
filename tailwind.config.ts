import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#0a0a0a',
        'card-dark': '#1a1a1a',
        'alert-yellow': '#facc15',
        'target-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
};

export default config;
