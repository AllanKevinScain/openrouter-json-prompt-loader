import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17211b',
        moss: '#315f44',
        leaf: '#4f8a5f',
        paper: '#f7f8f3',
        line: '#d9dfd3',
        coral: '#d9654f',
      },
      boxShadow: {
        panel: '0 18px 60px rgba(23, 33, 27, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
