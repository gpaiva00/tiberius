const { lighten } = require('polished')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        gray: '#333',
        lightGray: '#d1dcde',
        lightenGray: lighten(0.3, '#333'),
        primary: '#467cd0',
        header: '#ff91e7',
        lightenPrimary: lighten(0.1, '#467cd0'),
        white: '#F5F5F5',
      },
      borderRadius: {
        default: '0.375rem',
      },
      boxShadow: {
        default: '0.5rem 0.5rem 0rem 0.125rem #000',
      },
      borderWidth: {
        default: '0.125rem',
      },
      borderColor: {
        default: '#000',
      },
    },
  },
  plugins: [],
}
