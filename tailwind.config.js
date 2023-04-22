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
        // background: '#E6E6E6',
        background: '#292929',
        black: '#111',
        gray: '#333333',
        lightGray: '#E6E6E6',
        lightenGray: lighten(0.5, '#333'),
        primary: '#f34971',
        lightenPrimary: lighten(0.1, '#f34971'),
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
