const { lighten } = require('polished')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#111',
        gray: '#333333',
        lightGray: '#d1dcde',
        lightenGray: lighten(0.5, '#333'),
        primary: '#467cd0',
        header: '#ff91e7',
        lightenPrimary: lighten(0.1, '#467cd0'),
        white: '#F5F5F5',
      },
      borderRadius: {
        'default': '6px',
      },
      boxShadow: {
        'default': '8px 8px 0px 4px #111',
      }
    },
  },
  plugins: [],
}
