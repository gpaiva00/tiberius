const { lighten, darken } = require('polished')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000',
        darkBackground: '#090909',
        darkCardBackground: '#2d2d2d',
        darkTextGray: '#acacac',
        darkTextLight: '#f5f5f5',
        darkPrimary: darken(0.1, '#467cd0'),
        red: '#ef4444',
        gray: '#333',
        lightGray: '#e6e6e6',
        lightenGray: lighten(0.3, '#333'),
        lightenGray2: lighten(0.5, '#333'),
        primary: '#467cd0',
        header: '#F5F5F5',
        white: '#F5F5F5',
      },
      borderRadius: {
        default: '0.375rem',
      },
      boxShadow: {
        default: '50px 50px 100px #c6c6c6, -50px -50px 100px #f5f5f5;',
      },
      borderWidth: {
        default: '0.0625rem',
        divider: '0.0625rem',
      },
      borderColor: {
        default: '#e6e6e6',
        dark: '#969696',
        divider: '#e8e8e8',
      },
      width: {
        mainCard: '37.5rem',
        inputText: '36rem',
      },
      height: {
        mainCard: '37.5rem',
        listBody: '30rem',
        cardFooter: '5rem',
        inputText: '2.5rem',
      },
    },
  },
  plugins: [],
}
